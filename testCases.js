// LoanBiasAudit.jsx
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";

export default function LoanBiasAudit() {
    const [data, setData] = useState([]);
    const [threshold, setThreshold] = useState(0.55);
    const [model, setModel] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [fileName, setFileName] = useState(null);

    // --- 1. Synthetic Data Generation ---
    const generateSyntheticData = () => {
        const n = 1000;
        const genders = ["Male", "Female"];
        const ethnicities = ["Group A", "Group B"];

        const samples = Array.from({ length: n }, () => ({
            gender: genders[Math.floor(Math.random() * 2)],
            ethnicity: ethnicities[Math.floor(Math.random() * 2)],
            income: 50000 + 15000 * randn(),
            credit_score: 650 + 50 * randn(),
            loan_amount: 20000 + 5000 * randn(),
            approved: Math.random() < 0.6 ? 1 : 0,
        }));
        setData(samples);
    };

    const randn = () => {
        // Gaussian random
        let u = 0,
            v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    // --- 2. Preprocessing ---
    const encodeCategorical = (data) => {
        const genderMap = { Male: 0, Female: 1 };
        const ethnicityMap = { "Group A": 0, "Group B": 1 };
        return data.map((d) => ({
            ...d,
            gender_encoded: genderMap[d.gender],
            ethnicity_encoded: ethnicityMap[d.ethnicity],
        }));
    };

    const normalize = (arr) => {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const std = Math.sqrt(arr.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / arr.length);
        return arr.map((x) => (x - mean) / std);
    };

    const preprocess = (data) => {
        const enc = encodeCategorical(data);
        const income = normalize(enc.map((d) => d.income));
        const credit = normalize(enc.map((d) => d.credit_score));
        const loan = normalize(enc.map((d) => d.loan_amount));

        return enc.map((d, i) => ({
            ...d,
            income: income[i],
            credit_score: credit[i],
            loan_amount: loan[i],
        }));
    };

    // --- 3. Train Logistic Regression ---
    const trainModel = async () => {
        const processed = preprocess(data);
        const xs = tf.tensor2d(
            processed.map((d) => [d.gender_encoded, d.ethnicity_encoded, d.income, d.credit_score, d.loan_amount])
        );
        const ys = tf.tensor2d(processed.map((d) => [d.approved]));

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [5], units: 1, activation: "sigmoid" }));
        model.compile({ optimizer: tf.train.adam(0.05), loss: "binaryCrossentropy", metrics: ["accuracy"] });

        await model.fit(xs, ys, { epochs: 50, verbose: 0 });
        setModel(model);
        xs.dispose();
        ys.dispose();
    };

    // --- 4. Fairness Metrics ---
    const truePositiveRate = (yTrue, yPred) => {
        const tp = yTrue.reduce((sum, y, i) => sum + (y === 1 && yPred[i] === 1 ? 1 : 0), 0);
        const fn = yTrue.reduce((sum, y, i) => sum + (y === 1 && yPred[i] === 0 ? 1 : 0), 0);
        return tp + fn === 0 ? 0 : tp / (tp + fn);
    };

    const selectionRate = (yPred) => yPred.filter((p) => p === 1).length / yPred.length;

    const calculateMetricsByGroup = (yTrue, yPred, groups) => {
        const unique = [...new Set(groups)];
        const results = {};
        unique.forEach((g) => {
            const idx = groups.map((x, i) => (x === g ? i : -1)).filter((x) => x >= 0);
            const yt = idx.map((i) => yTrue[i]);
            const yp = idx.map((i) => yPred[i]);
            const acc = yt.filter((v, i) => v === yp[i]).length / yt.length;
            const sel = selectionRate(yp);
            const tpr = truePositiveRate(yt, yp);
            results[g] = { Accuracy: acc, "Selection Rate": sel, "True Positive Rate": tpr };
        });
        return results;
    };

    const fairnessDiff = (values) => Math.max(...values) - Math.min(...values);

    const auditBias = async () => {
        if (!model) return;
        const processed = preprocess(data);
        const xs = tf.tensor2d(
            processed.map((d) => [d.gender_encoded, d.ethnicity_encoded, d.income, d.credit_score, d.loan_amount])
        );
        const probs = (await model.predict(xs).array()).flat();
        const yPred = probs.map((p) => (p > threshold ? 1 : 0));
        const yTrue = processed.map((d) => d.approved);

        const genderGroups = processed.map((d) => d.gender);
        const ethGroups = processed.map((d) => d.ethnicity);

        const genderMetrics = calculateMetricsByGroup(yTrue, yPred, genderGroups);
        const ethMetrics = calculateMetricsByGroup(yTrue, yPred, ethGroups);

        setMetrics({
            gender: genderMetrics,
            ethnicity: ethMetrics,
            dpDiffGender: fairnessDiff(Object.values(genderMetrics).map((g) => g["Selection Rate"])),
            eoDiffGender: fairnessDiff(Object.values(genderMetrics).map((g) => g["True Positive Rate"])),
            dpDiffEth: fairnessDiff(Object.values(ethMetrics).map((g) => g["Selection Rate"])),
            eoDiffEth: fairnessDiff(Object.values(ethMetrics).map((g) => g["True Positive Rate"])),
        });
        xs.dispose();
    };

    // --- 5. File Upload (CSV) ---
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
            },
        });
    };

    // --- Initial synthetic data ---
    useEffect(() => {
        generateSyntheticData();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">🏦 Loan Approval Bias Audit Sandbox (JS)</h1>

            <div className="mb-4">
                <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />
                {fileName && <p className="text-sm text-gray-600">Uploaded: {fileName}</p>}
            </div>

            <button
                onClick={trainModel}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
                Train Model
            </button>
            <button
                onClick={auditBias}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Run Bias Audit
            </button>

            <div className="mt-6">
                <label>Decision Threshold: {threshold.toFixed(2)}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full"
                />
            </div>

            {metrics && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Fairness Metrics</h2>
                    <pre className="bg-gray-100 p-4 rounded">
                        {JSON.stringify(metrics, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

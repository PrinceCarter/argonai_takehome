/* This file contains a dictionary of synonyms for various cancer types.
This allows the user to search for a cancer type using different terms. */
const synonyms: { [key: string]: string[] } = {
  "non small cell lung cancer": [
    "nsclc",
    "non small cell lung carcinoma",
    "non small cell carcinoma of the lung",
    "lung carcinoma non small cell",
    "carcinoma of the lungs non small cell",
    "non-small cell carcinoma of the lung",
    "lung cancer non-small cell",
    "non small cell cancer of the lungs",
    "non-small-cell lung cancer",
    "non-small-cell lung carcinoma",
    "non-small-cell lung neoplasm",
    "non-small-cell lung tumor",
    "lung neoplasm non-small-cell",
    "lung tumor non-small-cell",
    "non-small cell lung adenocarcinoma",
    "lung carcinoma non-small-cell",
    "non-small-cell carcinoma",
    "lung cancer non-small cell type",
    "lung non-small-cell carcinoma",
    "non small cell carcinoma",
    "NSCLC adenocarcinoma",
    "adenocarcinoma of the lung",
    "NSCLC squamous cell carcinoma",
    "squamous cell carcinoma of the lung",
  ],
};

export default synonyms;

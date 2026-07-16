export interface MedicalArticle {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown/HTML string
  authorId: string; // Links to a doctor
  reviewerId: string; // Links to a doctor
  publishedAt: string;
  updatedAt: string;
  relatedConditionSlug: string; // Links to transactional routes
}

export const medicalArticles: MedicalArticle[] = [
  {
    id: "diabetes-type-2",
    title: "Understanding Type 2 Diabetes: Symptoms, Causes, and Management",
    description: "A comprehensive guide to Type 2 Diabetes, how it affects your body, and actionable steps to manage your blood sugar levels.",
    content: `
## What is Type 2 Diabetes?
Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose) — an important source of fuel for your body.

With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.

## Common Symptoms
You may have type 2 diabetes for years without knowing it. Look out for:
* Increased thirst
* Frequent urination
* Increased hunger
* Unintended weight loss
* Fatigue
* Blurred vision

## When to see a doctor
See your doctor if you notice any type 2 diabetes symptoms. Early diagnosis is critical in preventing serious complications like heart disease, kidney damage, or nerve damage.
    `,
    authorId: "1", // Dr. Ananya Sen
    reviewerId: "3", // Dr. Priya Sharma
    publishedAt: "2023-10-12T10:00:00Z",
    updatedAt: "2024-01-05T08:30:00Z",
    relatedConditionSlug: "diabetes",
  },
  {
    id: "heart-attack-symptoms",
    title: "Early Warning Signs of a Heart Attack",
    description: "Learn to recognize the early symptoms of a heart attack. Quick medical intervention can save your life.",
    content: `
## Overview
A heart attack occurs when the flow of blood to the heart is severely reduced or blocked. The blockage is usually due to a buildup of fat, cholesterol and other substances in the heart (coronary) arteries.

## Major Warning Signs
* **Chest pain or discomfort**: Most heart attacks involve discomfort in the center or left side of the chest that lasts for more than a few minutes or that goes away and comes back.
* **Upper body discomfort**: Pain or discomfort in one or both arms, the back, neck, jaw or stomach.
* **Shortness of breath**: This can occur with or without chest discomfort.
* **Cold sweat, nausea, or lightheadedness**.

## What to do
If you or someone else has these symptoms, call emergency medical help immediately. Do not drive yourself to the hospital unless there are no other options.
    `,
    authorId: "2", // Dr. Rahul Banerjee
    reviewerId: "2",
    publishedAt: "2023-11-20T14:15:00Z",
    updatedAt: "2024-02-18T09:20:00Z",
    relatedConditionSlug: "chest-pain",
  }
];

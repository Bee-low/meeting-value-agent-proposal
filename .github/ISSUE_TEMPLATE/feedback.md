---
name: Feedback
description: Share feedback on the proposal, product direction, or meeting assessment model
title: "Feedback: "
labels: [feedback]
body:
  - type: textarea
    id: feedback
    attributes:
      label: What feedback do you have?
      description: Tell us what is clear, unclear, useful, risky, or missing.
    validations:
      required: true
  - type: dropdown
    id: area
    attributes:
      label: Area
      options:
        - Manager value
        - Meeting cost model
        - Agenda and outcome scoring
        - Action allocation
        - Microsoft Teams integration
        - Privacy and governance
        - UI / presentation
        - Other
    validations:
      required: true
  - type: textarea
    id: suggestion
    attributes:
      label: Suggested improvement
      description: Optional, but helpful if you have a concrete change in mind.
---

# SalesAgents AI - Home Credit LAP AI Voice Agent

Production-ready AI Voice Agent prompt, conversational architecture, test suites, and simulation harness designed for the **Home Credit Loan Against Property (LAP) Qualification** use case.

🌐 **Live Production Deployment**: [https://salesagents-ai-lap-agent.vercel.app](https://salesagents-ai-lap-agent.vercel.app)  
📦 **GitHub Repository**: [https://github.com/Harshith-02/salesagents-ai-lap-agent](https://github.com/Harshith-02/salesagents-ai-lap-agent)

---

## 📁 Repository Structure

- **[`system_prompt.txt`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/system_prompt.txt)**: The complete, raw, copy-paste-ready System Prompt for voice platforms like **Retell AI**, **Bolna**, or **Vapi**.
- **[`SYSTEM_PROMPT.md`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/SYSTEM_PROMPT.md)**: Formatted System Prompt with detailed annotation of variables, state logic, and execution blocks.
- **[`APPROACH_AND_ARCHITECTURE.md`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/APPROACH_AND_ARCHITECTURE.md)**: Deep-dive engineering documentation covering the 5-layer architecture, State Extraction Engine, Decision Matrices, and Voice Design Best Practices.
- **[`TEST_SCENARIOS_AND_TRANSCRIPTS.md`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/TEST_SCENARIOS_AND_TRANSCRIPTS.md)**: 14 exhaustive end-to-end test transcripts covering golden paths, disqualifications, out-of-order slot filling, rate diversions, transfer switches, and Hindi execution.
- **[`voice_agent_simulator.py`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/voice_agent_simulator.py)**: Interactive Python CLI and automated regression test suite simulating the agent's state machine and conversational logic.
- **[`generate_audio_scenarios.py`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/generate_audio_scenarios.py)**: Speech synthesis pipeline to reproduce audio test dialogues.
- **[`audio/`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio)**: Directory containing synthesized `.wav` audio recordings for key test scenarios:
  - [`scenario_1_golden_path.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_1_golden_path.wav)
  - [`scenario_2_agricultural_disqualification.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_2_agricultural_disqualification.wav)
  - [`scenario_3_cash_income_disqualification.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_3_cash_income_disqualification.wav)
  - [`scenario_4_missing_documents_disqualification.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_4_missing_documents_disqualification.wav)
  - [`scenario_7_loan_ceiling_negotiation.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_7_loan_ceiling_negotiation.wav)
  - [`scenario_9_existing_loan_transfer.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_9_existing_loan_transfer.wav)
  - [`scenario_11_busy_customer_callback.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_11_busy_customer_callback.wav)
  - [`scenario_12_out_of_order_extraction.wav`](file:///C:/Users/harsh/.gemini/antigravity-ide/scratch/salesagents-ai-lap-agent/audio/scenario_12_out_of_order_extraction.wav)

---

## 🚀 Quick Start: Running the Test Simulator & Synthesizing Audio

To execute the automated regression test suite across all 14 scenarios:

```bash
python voice_agent_simulator.py --run-tests
```

To run an interactive call simulation directly in your terminal:

```bash
python voice_agent_simulator.py --interactive
```

To regenerate the call audio `.wav` files:

```bash
python generate_audio_scenarios.py
```

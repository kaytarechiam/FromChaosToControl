"use client";

import { useEffect, useMemo, useState } from "react";
import StepNav from "@/components/ui/StepNav";
import Warning from "@/components/ui/Warning";
import Landing from "@/components/steps/Landing";
import IdentityInput from "@/components/steps/IdentityInput";
import BossEncounter from "@/components/steps/BossEncounter";
import SystemScan from "@/components/steps/SystemScan";
import BattleStrategy from "@/components/steps/BattleStrategy";
import BattleLog from "@/components/steps/BattleLog";
import MissionReport from "@/components/steps/MissionReport";
import { generateMission } from "@/lib/generateMission";
import { buildTrackerDays, getDefaultState, loadState, saveState, clearState } from "@/lib/storage";
import {
  validateChaosProfile,
  validateControlPlan,
  validateIdentity,
  validateTrackerHasEntry,
} from "@/lib/validation";

export default function RecoveryConsole() {
  const [state, setState] = useState(getDefaultState());
  const [hydrated, setHydrated] = useState(false);
  const [saveWarning, setSaveWarning] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      const ok = saveState(state);
      setSaveWarning(!ok);
    }
  }, [state, hydrated]);

  const maxUnlocked = useMemo(() => {
    let max = 1;
    if (state.mission) max = 3;
    if (!validateChaosProfile(state.chaosProfile)) max = 4;
    if (max >= 4 && !validateControlPlan(state.controlPlan)) max = 5;
    if (max >= 5 && !validateTrackerHasEntry(state.tracker)) max = 6;
    return max;
  }, [state]);

  function goToStep(step) {
    setState((s) => ({ ...s, step }));
  }

  function handleGenerateMission(identity) {
    const mission = generateMission(identity.nim);
    setState((s) => ({
      ...s,
      identity,
      mission,
      tracker: buildTrackerDays(mission.modifier.durationDays),
      step: 2,
    }));
  }

  function updateChaosProfile(chaosProfile) {
    setState((s) => ({ ...s, chaosProfile }));
  }

  function updateControlPlan(controlPlan) {
    setState((s) => ({ ...s, controlPlan }));
  }

  function updateTracker(tracker) {
    setState((s) => ({ ...s, tracker }));
  }

  function updateMissionReport(missionReport) {
    setState((s) => ({ ...s, missionReport }));
  }

  function handleReset() {
    clearState();
    setState(getDefaultState());
  }

  function handleImport(importedState) {
    setState(importedState);
  }

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-sm text-console-accent animate-blink">
          booting system recovery console...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {saveWarning && (
        <Warning>
          Data terakhir gagal disimpan otomatis di browser (kemungkinan foto bukti kegedean untuk
          local storage). Coba pakai foto dengan ukuran lebih kecil, atau hapus salah satu foto.
        </Warning>
      )}

      {state.step > 0 && (
        <StepNav current={state.step} maxUnlocked={maxUnlocked} onJump={goToStep} />
      )}

      {state.step === 0 && <Landing onStart={() => goToStep(1)} />}

      {state.step === 1 && (
        <IdentityInput
          initial={state.identity}
          onBack={() => goToStep(0)}
          onSubmit={handleGenerateMission}
          validateIdentity={validateIdentity}
        />
      )}

      {state.step === 2 && (
        <BossEncounter
          identity={state.identity}
          mission={state.mission}
          tracker={state.tracker}
          onBack={() => goToStep(1)}
          onNext={() => goToStep(3)}
        />
      )}

      {state.step === 3 && (
        <SystemScan
          mission={state.mission}
          value={state.chaosProfile}
          onChange={updateChaosProfile}
          onBack={() => goToStep(2)}
          onNext={() => goToStep(4)}
        />
      )}

      {state.step === 4 && (
        <BattleStrategy
          mission={state.mission}
          chaosProfile={state.chaosProfile}
          value={state.controlPlan}
          onChange={updateControlPlan}
          onBack={() => goToStep(3)}
          onNext={() => goToStep(5)}
        />
      )}

      {state.step === 5 && (
        <BattleLog
          mission={state.mission}
          tracker={state.tracker}
          onChange={updateTracker}
          onBack={() => goToStep(4)}
          onNext={() => goToStep(6)}
        />
      )}

      {state.step === 6 && (
        <MissionReport
          state={state}
          onChangeMissionReport={updateMissionReport}
          onBack={() => goToStep(5)}
          onReset={handleReset}
          onImport={handleImport}
        />
      )}
    </main>
  );
}

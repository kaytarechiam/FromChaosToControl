"use client";

import { useEffect, useState } from "react";
import Landing from "@/components/steps/Landing";
import IdentityInput from "@/components/steps/IdentityInput";
import MissionCard from "@/components/steps/MissionCard";
import { generateMission } from "@/lib/generateMission";
import { getDefaultState, loadState, saveState, clearState } from "@/lib/storage";
import { validateIdentity } from "@/lib/validation";

export default function RecoveryConsole() {
  const [state, setState] = useState(getDefaultState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  function goToStep(step) {
    setState((s) => ({ ...s, step }));
  }

  function handleGenerateMission(identity) {
    const mission = generateMission(identity.nim);
    setState((s) => ({
      ...s,
      identity,
      mission,
      step: 2,
    }));
  }

  function handleReset() {
    clearState();
    setState(getDefaultState());
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
        <MissionCard
          identity={state.identity}
          mission={state.mission}
          onBack={() => goToStep(1)}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

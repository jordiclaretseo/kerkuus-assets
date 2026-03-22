'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';

type DemoScreen =
  | 'landing'
  | 'onboarding'
  | 'bluetooth'
  | 'student'
  | 'emergency'
  | 'teacher'
  | 'parent'
  | 'history'
  | 'profile';

type SafetyState = 'safe' | 'monitoring' | 'alert';
type BandState = 'disconnected' | 'found' | 'connected';
type EmergencyFlow = 'idle' | 'confirm' | 'sent';

type Incident = {
  id: string;
  student: string;
  type: string;
  status: 'Active' | 'In progress' | 'Resolved';
  time: string;
  location: string;
};

const tabs: { key: DemoScreen; label: string }[] = [
  { key: 'landing', label: 'Intro' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'bluetooth', label: 'Band' },
  { key: 'student', label: 'Student' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'parent', label: 'Parent' },
  { key: 'history', label: 'History' },
  { key: 'profile', label: 'Profile' }
];

const reasons = ['Bullying', 'Intimidation', 'Physical aggression', 'Feeling unsafe', 'Need help now'];

const incidents: Incident[] = [
  {
    id: 'INC-2403',
    student: 'Luca Rossi',
    type: 'Bullying report',
    status: 'Active',
    time: '10:42',
    location: 'Main courtyard'
  },
  {
    id: 'INC-2402',
    student: 'Marta Silva',
    type: 'Intimidation',
    status: 'In progress',
    time: '09:18',
    location: 'Hall B'
  },
  {
    id: 'INC-2398',
    student: 'Noah Keller',
    type: 'Feeling unsafe',
    status: 'Resolved',
    time: 'Yesterday 14:26',
    location: 'Gym entrance'
  }
];

function statusStyle(state: SafetyState) {
  if (state === 'safe') return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if (state === 'monitoring') return 'bg-amber-50 text-amber-700 ring-amber-100';
  return 'bg-rose-50 text-rose-700 ring-rose-100';
}

export default function SafeWaveDemoPage() {
  const [screen, setScreen] = useState<DemoScreen>('landing');
  const [bandState, setBandState] = useState<BandState>('disconnected');
  const [safetyState, setSafetyState] = useState<SafetyState>('safe');
  const [emergencyFlow, setEmergencyFlow] = useState<EmergencyFlow>('idle');
  const [selectedReason, setSelectedReason] = useState<string>('Bullying');

  const bluetoothLabel = useMemo(() => {
    if (bandState === 'connected') return 'Connected';
    if (bandState === 'found') return 'Device found';
    return 'Not connected';
  }, [bandState]);

  const alertCount = incidents.filter((i) => i.status !== 'Resolved').length;

  function connectBand() {
    if (bandState === 'disconnected') {
      setBandState('found');
      return;
    }
    setBandState('connected');
    setSafetyState('monitoring');
  }

  function sendEmergency() {
    setEmergencyFlow('sent');
    setSafetyState('alert');
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
      <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-xl shadow-slate-200/40 backdrop-blur sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">SafeWave demo · anti-bullying</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Protection in every moment</h1>
            <p className="mt-1 text-sm text-slate-600">Clickable MVP for students, families, and schools across Europe.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-600 sm:w-72">
            <Stat label="Students" value="+1000" />
            <Stat label="Schools" value="+50" />
            <Stat label="Alert speed" value="Instant" />
          </div>
        </div>

        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setScreen(tab.key)}
              className={clsx(
                'whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition',
                screen === tab.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
          {screen === 'landing' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-cyan-300">SafeWave</p>
                <h2 className="mt-1 text-2xl font-semibold">Technology against bullying</h2>
                <p className="mt-3 text-sm text-slate-200">
                  Real-time protection with a smart wristband + rapid alerts to trusted adults.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Students are never alone" body="Discreet SOS from the wristband or in-app emergency button." />
                <InfoCard title="Faster intervention" body="Teachers and parents are notified immediately in unsafe situations." />
                <InfoCard title="School-ready dashboard" body="See active incidents, status, and response in less than 3 seconds." />
                <InfoCard title="Scalable SaaS model" body="Works for schools, municipalities, and family safety ecosystems." />
              </div>
            </div>
          )}

          {screen === 'onboarding' && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900">How SafeWave protects students</h2>
              <div className="mt-4 grid gap-3">
                {[
                  ['1', 'Wear the bracelet', 'The student wears SafeWave every school day.'],
                  ['2', 'Connect by Bluetooth', 'One tap to pair with the SafeWave mobile app.'],
                  ['3', 'Send alert if needed', 'Press the emergency button in-app or on band.'],
                  ['4', 'Adults act fast', 'Teacher and family get instant warning with context.']
                ].map((step) => (
                  <article key={step[0]} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">{step[0]}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{step[1]}</h3>
                      <p className="text-sm text-slate-600">{step[2]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {screen === 'bluetooth' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Wristband pairing</h2>
              <p className="text-sm text-slate-600">Friendly setup for students. No technical steps.</p>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">SafeWave Band S1</p>
                <p className={clsx('mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ring-1', statusStyle(bandState === 'connected' ? 'safe' : bandState === 'found' ? 'monitoring' : 'alert'))}>
                  {bluetoothLabel}
                </p>
                <button
                  onClick={connectBand}
                  className="mt-4 w-full rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-500"
                >
                  {bandState === 'disconnected' && 'Find my SafeWave band'}
                  {bandState === 'found' && 'Connect now'}
                  {bandState === 'connected' && 'Connected ✓'}
                </button>
                <p className="mt-3 text-xs text-slate-500">When connected, SafeWave can send emergency alerts in seconds.</p>
              </div>
            </div>
          )}

          {screen === 'student' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Student home</h2>
              <article className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Current safety status</p>
                <p className={clsx('mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1', statusStyle(safetyState))}>
                  {safetyState === 'safe' ? 'Safe' : safetyState === 'monitoring' ? 'Monitoring' : 'Alert'}
                </p>
                <p className="mt-3 text-sm text-slate-600">Real-time protection against bullying, harassment, and intimidation at school.</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <button onClick={() => setSafetyState('safe')} className="rounded-xl bg-emerald-100 px-2 py-2 font-semibold text-emerald-700">Set Safe</button>
                  <button onClick={() => setSafetyState('monitoring')} className="rounded-xl bg-amber-100 px-2 py-2 font-semibold text-amber-700">Set Monitoring</button>
                  <button onClick={() => setSafetyState('alert')} className="rounded-xl bg-rose-100 px-2 py-2 font-semibold text-rose-700">Set Alert</button>
                </div>
              </article>
              <button
                onClick={() => {
                  setEmergencyFlow('confirm');
                  setScreen('emergency');
                }}
                className="w-full rounded-2xl bg-rose-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-rose-500/30"
              >
                Emergency: I need help now
              </button>
            </div>
          )}

          {screen === 'emergency' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Emergency alert flow</h2>
              {emergencyFlow === 'idle' && (
                <button onClick={() => setEmergencyFlow('confirm')} className="w-full rounded-2xl bg-rose-600 px-4 py-4 text-lg font-bold text-white">
                  Send emergency alert
                </button>
              )}
              {emergencyFlow === 'confirm' && (
                <article className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                  <p className="text-sm font-semibold text-rose-700">Confirm emergency alert</p>
                  <p className="mt-1 text-sm text-rose-600">Select a reason (optional) and notify trusted adults now.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedReason(r)}
                        className={clsx(
                          'rounded-full px-3 py-1 text-xs font-semibold',
                          selectedReason === r ? 'bg-rose-600 text-white' : 'bg-white text-rose-700 ring-1 ring-rose-200'
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <button onClick={sendEmergency} className="mt-4 w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white">
                    Confirm and send alert
                  </button>
                </article>
              )}
              {emergencyFlow === 'sent' && (
                <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-semibold text-emerald-700">Alert sent to trusted adults</p>
                  <p className="mt-1 text-sm text-emerald-700">Your teacher and family have been notified.</p>
                  <p className="mt-3 text-xs text-emerald-800">Risk type: {selectedReason} · Status: Team responding</p>
                  <button onClick={() => setEmergencyFlow('idle')} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white">
                    Reset demo flow
                  </button>
                </article>
              )}
            </div>
          )}

          {screen === 'teacher' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Teacher dashboard</h2>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <Stat label="Safe" value="22" tone="safe" />
                <Stat label="Monitoring" value="5" tone="monitoring" />
                <Stat label="Alert" value={String(alertCount)} tone="alert" />
              </div>
              <div className="space-y-2">
                {incidents.slice(0, 2).map((incident) => (
                  <article key={incident.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{incident.student}</p>
                      <span className={clsx('rounded-full px-2 py-1 text-xs font-semibold', incident.status === 'Active' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700')}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{incident.type} · {incident.location} · {incident.time}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {screen === 'parent' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Parent notification</h2>
              <article className="rounded-2xl border border-rose-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">Emergency alert received</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">Child: Luca Rossi</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li><strong>Time:</strong> 10:42</li>
                  <li><strong>Risk type:</strong> {selectedReason}</li>
                  <li><strong>School notified:</strong> Yes</li>
                  <li><strong>Response status:</strong> Teacher en route (ETA 2 min)</li>
                </ul>
              </article>
            </div>
          )}

          {screen === 'history' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Incident history</h2>
              <div className="space-y-3">
                {incidents.map((incident) => (
                  <article key={incident.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{incident.id}</span>
                      <span>{incident.time}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{incident.student} · {incident.type}</p>
                    <p className="text-xs text-slate-600">Action log: alert created → school notified → family notified → response updated.</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {screen === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Student profile & safety settings</h2>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
                <p><strong>Name:</strong> Luca Rossi</p>
                <p className="mt-2"><strong>Assigned teacher:</strong> Ms. Elena Garcia</p>
                <p className="mt-2"><strong>Emergency contacts:</strong> Anna Rossi (Mother), Marco Rossi (Father)</p>
                <p className="mt-2"><strong>Wristband state:</strong> {bluetoothLabel}</p>
                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Safety preferences</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                    <li>Auto-alert if stress pattern remains abnormal for 90 seconds</li>
                    <li>Send vibration confirmation before alert dispatch</li>
                    <li>Always notify school + family on emergency trigger</li>
                  </ul>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </article>
  );
}

function Stat({ label, value, tone = 'neutral' }: { label: string; value: string; tone?: 'neutral' | 'safe' | 'monitoring' | 'alert' }) {
  const toneClass =
    tone === 'safe'
      ? 'bg-emerald-50 text-emerald-700'
      : tone === 'monitoring'
      ? 'bg-amber-50 text-amber-700'
      : tone === 'alert'
      ? 'bg-rose-50 text-rose-700'
      : 'bg-slate-100 text-slate-700';

  return (
    <div className={clsx('rounded-xl px-2 py-2', toneClass)}>
      <p>{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

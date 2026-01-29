import { DecisionTrace } from "../aiV2/utils/DecisionTrace";
import { SignalHit } from "../aiV2/utils/DecisionTrace";

type Props = {
  trace: DecisionTrace;
};
const styles = {
  container: {
    fontFamily: "monospace",
    padding: 16,
    border: "1px solid #ddd",
    borderRadius: 8,
    background: "black",
  },
  section: {
    marginBottom: 16,
  },
  row: {
    display: "flex",
    gap: 8,
  },
  muted: {
    opacity: 0.6,
    fontStyle: "italic",
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.section}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function SignalList({
  title,
  signals,
}: {
  title: string;
  signals: SignalHit[];
}) {
  return (
    <div style={{ marginBottom: 8 }}>
      <strong>{title}</strong>
      {signals.length === 0 ? (
        <div style={styles.muted}>No signals</div>
      ) : (
        <ul>
          {signals.map((s, i) => (
            <li key={i}>
              {s.signal} → <b>{s.shape}</b> (+{s.weight})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.row}>
      <strong>{label}:</strong>
      <span>{value}</span>
    </div>
  );
}


export function TraceViewer({ trace }: Props) {
  return (
    <div style={styles.container}>
      <h2>🧠 Decision Trace</h2>

      {/* Input */}
      <Section title="Input">
        <Row label="Raw" value={trace.input.raw} />
        <Row label="Normalized" value={trace.input.normalized} />
      </Section>

      {/* Interpretation */}
      <Section title="Interpretation">
        <Row label="Kind" value={trace.interpretation.kind} />
        <Row label="Entity" value={trace.interpretation.entity ?? "—"} />
        <Row label="Attribute" value={trace.interpretation.attribute ?? "—"} />
      </Section>

      {/* Reasoning */}
      <Section title="Reasoning">
        <SignalList
          title="Question form signals"
          signals={trace.reasoning.questionFormSignals}
        />
        <SignalList
          title="Attribute signals"
          signals={trace.reasoning.attributeSignals}
        />
        <SignalList
          title="Stability signals"
          signals={trace.reasoning.stabilitySignals}
        />
      </Section>

      {/* Scores */}
      <Section title="Scores">
        {Object.entries(trace.scores).map(([shape, score]) => (
          <Row key={shape} label={shape} value={score.toString()} />
        ))}
      </Section>

      {/* Outcome */}
      <Section title="Outcome">
        <Row label="Final shape" value={trace.outcome.shape} />
        <Row
          label="Teachable"
          value={trace.outcome.teachable ? "yes" : "no"}
        />
      </Section>
    </div>
  );
}

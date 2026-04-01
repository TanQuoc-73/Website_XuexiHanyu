"use client";

import { type SVGProps } from "react";

export type PandaPose =
  | "idle"
  | "walk"
  | "climb"
  | "sit"
  | "wave"
  | "sleep"
  | "peek";

interface PandaSVGProps extends SVGProps<SVGSVGElement> {
  pose?: PandaPose;
  direction?: "left" | "right";
  size?: number;
}

export function PandaSVG({
  pose = "idle",
  direction = "right",
  size = 80,
  ...props
}: PandaSVGProps) {
  const flip = direction === "left" ? "scale(-1, 1)" : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      width={size}
      height={size * 1.2}
      transform={flip}
      {...props}
    >
      {/* Body */}
      <ellipse cx="50" cy="78" rx="28" ry="32" fill="white" stroke="#1a1a1a" strokeWidth="2" />
      {/* Belly patch */}
      <ellipse cx="50" cy="82" rx="18" ry="20" fill="#f5f5f5" />

      {/* Left leg */}
      <PandaLeftLeg pose={pose} />
      {/* Right leg */}
      <PandaRightLeg pose={pose} />

      {/* Left arm */}
      <PandaLeftArm pose={pose} />
      {/* Right arm */}
      <PandaRightArm pose={pose} />

      {/* Head */}
      <circle cx="50" cy="38" r="26" fill="white" stroke="#1a1a1a" strokeWidth="2" />

      {/* Ears */}
      <circle cx="30" cy="16" r="10" fill="#1a1a1a" />
      <circle cx="30" cy="16" r="5" fill="#333" />
      <circle cx="70" cy="16" r="10" fill="#1a1a1a" />
      <circle cx="70" cy="16" r="5" fill="#333" />

      {/* Eye patches */}
      <ellipse cx="38" cy="35" rx="10" ry="9" fill="#1a1a1a" transform="rotate(-10 38 35)" />
      <ellipse cx="62" cy="35" rx="10" ry="9" fill="#1a1a1a" transform="rotate(10 62 35)" />

      {/* Eyes */}
      <PandaEyes pose={pose} />

      {/* Nose */}
      <ellipse cx="50" cy="46" rx="4" ry="3" fill="#1a1a1a" />

      {/* Mouth */}
      <PandaMouth pose={pose} />

      {/* Blush */}
      <circle cx="32" cy="46" r="4" fill="#ffb3b3" opacity="0.5" />
      <circle cx="68" cy="46" r="4" fill="#ffb3b3" opacity="0.5" />

      {/* Sleep Zzz */}
      {pose === "sleep" && <SleepBubbles />}

      {/* Bamboo for climb */}
      {pose === "climb" && (
        <rect x="88" y="0" width="6" rx="3" height="120" fill="#4a7c59" opacity="0.7" />
      )}
    </svg>
  );
}

function PandaEyes({ pose }: { pose: PandaPose }) {
  if (pose === "sleep") {
    return (
      <>
        {/* Closed eyes - sleeping */}
        <path d="M33 34 Q38 31 43 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M57 34 Q62 31 67 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    );
  }

  return (
    <>
      {/* Open eyes */}
      <circle cx="38" cy="34" r="4" fill="white" />
      <circle cx="62" cy="34" r="4" fill="white" />
      {/* Pupils */}
      <circle cx="39" cy="34" r="2.5" fill="#1a1a1a">
        {pose === "idle" && (
          <animate attributeName="cy" values="34;33;34" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="63" cy="34" r="2.5" fill="#1a1a1a">
        {pose === "idle" && (
          <animate attributeName="cy" values="34;33;34" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      {/* Eye shine */}
      <circle cx="40" cy="33" r="1" fill="white" />
      <circle cx="64" cy="33" r="1" fill="white" />

      {/* Blink animation */}
      {(pose === "idle" || pose === "sit") && (
        <>
          <rect x="33" y="31" width="11" height="7" rx="3" fill="#1a1a1a" opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.94;0.96;0.98;1" />
          </rect>
          <rect x="57" y="31" width="11" height="7" rx="3" fill="#1a1a1a" opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.94;0.96;0.98;1" />
          </rect>
        </>
      )}
    </>
  );
}

function PandaMouth({ pose }: { pose: PandaPose }) {
  if (pose === "wave" || pose === "peek") {
    // Happy open mouth
    return <path d="M45 50 Q50 56 55 50" stroke="#1a1a1a" strokeWidth="1.5" fill="#ff8888" strokeLinecap="round" />;
  }
  if (pose === "sleep") {
    // Small O mouth
    return <ellipse cx="50" cy="51" rx="2.5" ry="2" fill="#1a1a1a" />;
  }
  // Default smile
  return <path d="M44 50 Q50 54 56 50" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />;
}

function PandaLeftArm({ pose }: { pose: PandaPose }) {
  if (pose === "wave") {
    return (
      <ellipse cx="22" cy="58" rx="8" ry="14" fill="#1a1a1a" transform="rotate(30 22 58)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="30 22 58;-10 22 58;30 22 58"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </ellipse>
    );
  }
  if (pose === "climb") {
    return <ellipse cx="24" cy="58" rx="8" ry="14" fill="#1a1a1a" transform="rotate(-40 24 58)" />;
  }
  if (pose === "walk") {
    return (
      <ellipse cx="26" cy="70" rx="8" ry="13" fill="#1a1a1a" transform="rotate(15 26 70)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="15 26 70;-5 26 70;15 26 70"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </ellipse>
    );
  }
  return <ellipse cx="26" cy="70" rx="8" ry="13" fill="#1a1a1a" transform="rotate(10 26 70)" />;
}

function PandaRightArm({ pose }: { pose: PandaPose }) {
  if (pose === "wave") {
    return <ellipse cx="74" cy="70" rx="8" ry="13" fill="#1a1a1a" transform="rotate(-10 74 70)" />;
  }
  if (pose === "climb") {
    return <ellipse cx="76" cy="52" rx="8" ry="14" fill="#1a1a1a" transform="rotate(40 76 52)" />;
  }
  if (pose === "walk") {
    return (
      <ellipse cx="74" cy="70" rx="8" ry="13" fill="#1a1a1a" transform="rotate(-15 74 70)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-15 74 70;5 74 70;-15 74 70"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </ellipse>
    );
  }
  return <ellipse cx="74" cy="70" rx="8" ry="13" fill="#1a1a1a" transform="rotate(-10 74 70)" />;
}

function PandaLeftLeg({ pose }: { pose: PandaPose }) {
  if (pose === "sit" || pose === "sleep") {
    return <ellipse cx="36" cy="104" rx="10" ry="7" fill="#1a1a1a" />;
  }
  if (pose === "walk") {
    return (
      <ellipse cx="38" cy="102" rx="8" ry="11" fill="#1a1a1a" transform="rotate(5 38 102)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="5 38 102;-10 38 102;5 38 102"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </ellipse>
    );
  }
  if (pose === "climb") {
    return <ellipse cx="40" cy="98" rx="8" ry="11" fill="#1a1a1a" transform="rotate(-20 40 98)" />;
  }
  return <ellipse cx="38" cy="102" rx="8" ry="11" fill="#1a1a1a" />;
}

function PandaRightLeg({ pose }: { pose: PandaPose }) {
  if (pose === "sit" || pose === "sleep") {
    return <ellipse cx="64" cy="104" rx="10" ry="7" fill="#1a1a1a" />;
  }
  if (pose === "walk") {
    return (
      <ellipse cx="62" cy="102" rx="8" ry="11" fill="#1a1a1a" transform="rotate(-5 62 102)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-5 62 102;10 62 102;-5 62 102"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </ellipse>
    );
  }
  if (pose === "climb") {
    return <ellipse cx="60" cy="104" rx="8" ry="11" fill="#1a1a1a" transform="rotate(20 60 104)" />;
  }
  return <ellipse cx="62" cy="102" rx="8" ry="11" fill="#1a1a1a" />;
}

function SleepBubbles() {
  return (
    <g>
      <text x="72" y="20" fontSize="10" fill="#666" fontWeight="bold" opacity="0.8">
        Z
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y" values="24;16" dur="2s" repeatCount="indefinite" />
      </text>
      <text x="80" y="12" fontSize="8" fill="#666" fontWeight="bold" opacity="0.6">
        z
        <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="y" values="16;8" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </text>
      <text x="86" y="6" fontSize="6" fill="#666" fontWeight="bold" opacity="0.4">
        z
        <animate attributeName="opacity" values="0;0.4;0" dur="2s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="y" values="10;2" dur="2s" repeatCount="indefinite" begin="1s" />
      </text>
    </g>
  );
}

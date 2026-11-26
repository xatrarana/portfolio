import fs from "node:fs"
import path from "node:path"
import { ImageResponse } from "next/og"
import { profile } from "@/lib/content"
import { getPost } from "@/lib/writing"

export const ogSize = { width: 1200, height: 630 }

const asset = (f: string) => fs.readFileSync(path.join(process.cwd(), "assets/og", f))

/** Share card for one article: title, tags and byline, in the site's light style. */
export function articleCard(slug: string) {
  const p = getPost(slug)
  const title = p?.title ?? "Writing"
  const avatar = `data:image/png;base64,${asset("avatar.png").toString("base64")}`
  const size = title.length > 60 ? 60 : title.length > 38 ? 70 : 82
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f3f3",
          color: "#111",
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Writing", ...(p?.tags ?? []).filter((t) => t !== "Guide" && t !== "Blog").slice(0, 3)].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "8px 20px",
                borderRadius: 999,
                background: i === 0 ? "#111" : "#fff",
                color: i === 0 ? "#fff" : "#111",
                border: "1px solid #e2e2e2",
              }}
            >
              {t}
            </div>
          ))}
          {p ? (
            <div style={{ display: "flex", fontSize: 22, padding: "8px 4px", color: "#8a8a8a" }}>{p.minutes} min read</div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Inter Display",
            fontSize: size,
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} width={76} height={76} alt="" style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontFamily: "Inter Display", fontSize: 30 }}>
                {profile.firstName} {profile.lastName}
              </div>
              <div style={{ display: "flex", fontSize: 22, color: "#6e6e6e" }}>{profile.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24 }}>chhatrarana.com.np</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: asset("Inter-Medium.otf"), weight: 500, style: "normal" },
        { name: "Inter Display", data: asset("InterDisplay-Bold.otf"), weight: 700, style: "normal" },
      ],
    },
  )
}

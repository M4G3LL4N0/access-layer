import React from "react"

export type EventFeedItem = {
  id?: string
  title?: string
  venue?: string
  timestamp?: string
  status?: string
}

export type EventFeedProps = {
  title?: string
  events?: EventFeedItem[]
}

export default function EventFeed({
  title = "Recent events",
  events = [],
}: EventFeedProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-black">{title}</h2>
        <span className="text-sm text-neutral-500">{events.length} items</span>
      </div>

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/10 px-4 py-6 text-sm text-neutral-500">
            No events available.
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={event.id ?? `${event.title ?? "event"}-${index}`}
              className="rounded-xl border border-black/10 px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-medium text-black">{event.title ?? "Untitled event"}</div>
                  <div className="text-sm text-neutral-500">{event.venue ?? "Unknown venue"}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">
                    {event.status ?? "unknown"}
                  </div>
                  <div className="text-sm text-neutral-500">{event.timestamp ?? ""}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

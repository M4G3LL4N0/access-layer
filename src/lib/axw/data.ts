export type VenueStats = {
  venues: number
  entrypoints: number
  devices: number
  events: number
}

export type EventItem = {
  id: string
  title: string
  venue: string
  timestamp: string
  status: string
}

export type RecentEventsResult = {
  events: EventItem[]
}

export type VenueItem = {
  id: string
  name: string
  city?: string
  state?: string
  status: string
  events?: number | null
}

export async function getVenueStats(): Promise<VenueStats> {
  return {
    venues: 24,
    entrypoints: 81,
    devices: 46,
    events: 143,
  }
}

export async function getRecentEvents(limit = 10): Promise<RecentEventsResult> {
  const items: EventItem[] = [
    {
      id: "evt_1",
      title: "Main Floor Access Granted",
      venue: "Atlas Hall",
      timestamp: new Date().toISOString(),
      status: "approved",
    },
    {
      id: "evt_2",
      title: "Backstage Token Issued",
      venue: "North Dock",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      status: "issued",
    },
    {
      id: "evt_3",
      title: "Entry Window Closed",
      venue: "South Annex",
      timestamp: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
      status: "closed",
    },
    {
      id: "evt_4",
      title: "Operator Access Refreshed",
      venue: "West Gate",
      timestamp: new Date(Date.now() - 1000 * 60 * 71).toISOString(),
      status: "refreshed",
    },
    {
      id: "evt_5",
      title: "Credential Window Opened",
      venue: "East Wing",
      timestamp: new Date(Date.now() - 1000 * 60 * 96).toISOString(),
      status: "opened",
    },
  ]

  return {
    events: items.slice(0, limit),
  }
}

export async function getVenuesList(limit = 24): Promise<VenueItem[]> {
  const items: VenueItem[] = [
    {
      id: "ven_1",
      name: "Atlas Hall",
      city: "Los Angeles",
      state: "CA",
      status: "active",
      events: 8,
    },
    {
      id: "ven_2",
      name: "North Dock",
      city: "Los Angeles",
      state: "CA",
      status: "active",
      events: 5,
    },
    {
      id: "ven_3",
      name: "South Annex",
      city: "Los Angeles",
      state: "CA",
      status: "limited",
      events: 2,
    },
    {
      id: "ven_4",
      name: "West Gate",
      city: "Los Angeles",
      state: "CA",
      status: "active",
      events: 6,
    },
    {
      id: "ven_5",
      name: "East Wing",
      city: "Los Angeles",
      state: "CA",
      status: "active",
      events: 4,
    },
  ]

  return items.slice(0, limit)
}

export async function getNetworkGraph() {
  return {
    nodes: [
      { id: "venue_atlas", label: "Atlas Hall", type: "venue" },
      { id: "venue_north", label: "North Dock", type: "venue" },
      { id: "venue_south", label: "South Annex", type: "venue" },
    ],
    edges: [
      { source: "venue_atlas", target: "venue_north" },
      { source: "venue_north", target: "venue_south" },
    ],
  }
}

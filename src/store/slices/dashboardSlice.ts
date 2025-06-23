import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface DataPoint {
  id: string
  x: number
  y: number
  value: number
  category: string
  timestamp: string
  metadata: {
    region: string
    source: string
    confidence: number
  }
}

export interface Variable {
  id: string
  name: string
  type: "numeric" | "categorical" | "boolean"
  value: any
  min?: number
  max?: number
  options?: string[]
  description: string
  active: boolean
}

interface DashboardState {
  // Data
  dataPoints: DataPoint[]
  filteredDataPoints: DataPoint[]

  // Variables
  variables: Variable[]

  // UI State
  selectedDataPoint: DataPoint | null
  hoveredDataPoint: DataPoint | null
  isVariablesPanelOpen: boolean
  selectedVariableId: string | null

  // Loading states
  loading: boolean
  error: string | null
}

// Generate dummy data
const generateDummyData = (): DataPoint[] => {
  const categories = ["Sales", "Marketing", "Engineering", "Support"]
  const regions = ["North America", "Europe", "Asia Pacific", "Latin America"]
  const sources = ["Web", "Mobile", "API", "Import"]

  return Array.from({ length: 50 }, (_, i) => ({
    id: `point-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    value: Math.floor(Math.random() * 1000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      region: regions[Math.floor(Math.random() * regions.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      confidence: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
    },
  }))
}

const defaultVariables: Variable[] = [
  {
    id: "time-range",
    name: "Time Range",
    type: "categorical",
    value: "30d",
    options: ["7d", "30d", "90d", "1y"],
    description: "Select the time period for data analysis",
    active: true,
  },
  {
    id: "min-value",
    name: "Minimum Value",
    type: "numeric",
    value: 0,
    min: 0,
    max: 1000,
    description: "Filter data points by minimum value threshold",
    active: true,
  },
  {
    id: "category-filter",
    name: "Category Filter",
    type: "categorical",
    value: "all",
    options: ["all", "Sales", "Marketing", "Engineering", "Support"],
    description: "Filter data points by category",
    active: true,
  },
  {
    id: "show-confidence",
    name: "Show Confidence",
    type: "boolean",
    value: true,
    description: "Display confidence indicators on data points",
    active: false,
  },
  {
    id: "region-filter",
    name: "Region Filter",
    type: "categorical",
    value: "all",
    options: ["all", "North America", "Europe", "Asia Pacific", "Latin America"],
    description: "Filter data points by geographical region",
    active: false,
  },
]

const initialState: DashboardState = {
  dataPoints: generateDummyData(),
  filteredDataPoints: [],
  variables: defaultVariables,
  selectedDataPoint: null,
  hoveredDataPoint: null,
  isVariablesPanelOpen: false,
  selectedVariableId: null,
  loading: false,
  error: null,
}

// Async thunks
export const loadDataPoints = createAsyncThunk("dashboard/loadDataPoints", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return generateDummyData()
})

// Helper function to apply filters
const applyFilters = (dataPoints: DataPoint[], variables: Variable[]): DataPoint[] => {
  let filtered = [...dataPoints]

  variables.forEach((variable) => {
    if (!variable.active) return

    switch (variable.id) {
      case "min-value":
        filtered = filtered.filter((point) => point.value >= variable.value)
        break
      case "category-filter":
        if (variable.value !== "all") {
          filtered = filtered.filter((point) => point.category === variable.value)
        }
        break
      case "region-filter":
        if (variable.value !== "all") {
          filtered = filtered.filter((point) => point.metadata.region === variable.value)
        }
        break
      case "time-range":
        const now = new Date()
        const days = variable.value === "7d" ? 7 : variable.value === "30d" ? 30 : variable.value === "90d" ? 90 : 365
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
        filtered = filtered.filter((point) => new Date(point.timestamp) >= cutoff)
        break
    }
  })

  return filtered
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDataPoints: (state, action: PayloadAction<DataPoint[]>) => {
      state.dataPoints = action.payload
      state.filteredDataPoints = applyFilters(action.payload, state.variables)
    },
    setHoveredDataPoint: (state, action: PayloadAction<DataPoint | null>) => {
      state.hoveredDataPoint = action.payload
    },
    setSelectedDataPoint: (state, action: PayloadAction<DataPoint | null>) => {
      state.selectedDataPoint = action.payload
    },
    toggleVariablesPanel: (state) => {
      state.isVariablesPanelOpen = !state.isVariablesPanelOpen
    },
    updateVariable: (state, action: PayloadAction<{ id: string; updates: Partial<Variable> }>) => {
      const { id, updates } = action.payload
      const variableIndex = state.variables.findIndex((v) => v.id === id)
      if (variableIndex !== -1) {
        state.variables[variableIndex] = { ...state.variables[variableIndex], ...updates }
        state.filteredDataPoints = applyFilters(state.dataPoints, state.variables)
      }
    },
    setSelectedVariable: (state, action: PayloadAction<string | null>) => {
      state.selectedVariableId = action.payload
    },
    applyFiltersAction: (state) => {
      state.filteredDataPoints = applyFilters(state.dataPoints, state.variables)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDataPoints.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadDataPoints.fulfilled, (state, action) => {
        state.loading = false
        state.dataPoints = action.payload
        state.filteredDataPoints = applyFilters(action.payload, state.variables)
      })
      .addCase(loadDataPoints.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load data points"
      })
  },
})

export const {
  setDataPoints,
  setHoveredDataPoint,
  setSelectedDataPoint,
  toggleVariablesPanel,
  updateVariable,
  setSelectedVariable,
  applyFiltersAction,
} = dashboardSlice.actions

export default dashboardSlice.reducer

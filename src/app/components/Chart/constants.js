export const OPTIONS = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 8,
      hoverRadius: 8
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: value => {
            if (value % 1 === 0) return value;
          }
        }
      }
    ]
  }
};

export const BACKGROUND_COLORS = [
  "rgba(255, 26, 26, 0.2)",
  "rgba(255, 113, 26, 0.2)",
  "rgba(255, 209, 26, 0.2)",
  "rgba(156, 255, 26, 0.2)",
  "rgba(26, 255, 228, 0.2)",
  "rgba(26, 71, 255, 0.2)",
  "rgba(255, 26, 255, 0.2)",
  "rgba(140, 140, 140, 0.2)"
];

export const BORDER_COLORS = [
  "rgba(255, 26, 26, 1)",
  "rgba(255, 113, 26, 1)",
  "rgba(255, 209, 26, 1)",
  "rgba(156, 255, 26, 1)",
  "rgba(26, 255, 228, 1)",
  "rgba(26, 71, 255, 1)",
  "rgba(255, 26, 255, 1)",
  "rgba(140, 140, 140, 1)"
];

export const HOVER_BACKGROUND_COLORS = [
  "rgba(255, 26, 26, 0.4)",
  "rgba(255, 113, 26, 0.4)",
  "rgba(255, 209, 26, 0.4)",
  "rgba(156, 255, 26, 0.4)",
  "rgba(26, 255, 228, 0.4)",
  "rgba(26, 71, 255, 0.4)",
  "rgba(255, 26, 255, 0.4)",
  "rgba(140, 140, 140, 0.4)"
];

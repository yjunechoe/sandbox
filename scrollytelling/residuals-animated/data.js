// Sample of the {palmerpenguins} data,
// filtered to maximize x-spread for pedagogical purposes
// ---{r}
// data <- penguins %>%
//  na.omit() %>%
//  filter(species != "Chinstrap") %>%
//  arrange(body_mass_g) %>%
//  filter(row_number() %% 6 == 0) %>%
//  slice(1:40)
// ---
// Model fitted with `mod <- lm(observed ~ predictor, data)`
// ---{r}
// data <- broom::augment(mod, data, interval = "confidence") %>%
//   select(1:5) %>%
//   janitor::clean_names() %>%
//   mutate(residual = observed - fitted) %>%
//   modify(~ round(.x, 2)) %>%
//   arrange(residual)
// 

const data = [{"predictor":3725,"observed":35,"fitted":39.61,"lower":38.79,"upper":40.42,"residual":-4.61},{"predictor":3050,"observed":32.1,"fitted":36.06,"lower":34.79,"upper":37.33,"residual":-3.96},{"predictor":4450,"observed":39.6,"fitted":43.42,"lower":42.7,"upper":44.14,"residual":-3.82},{"predictor":3700,"observed":36.6,"fitted":39.48,"lower":38.65,"upper":40.3,"residual":-2.88},{"predictor":3775,"observed":37.3,"fitted":39.87,"lower":39.08,"upper":40.66,"residual":-2.57},{"predictor":4900,"observed":43.6,"fitted":45.78,"lower":44.84,"upper":46.73,"residual":-2.18},{"predictor":5200,"observed":45.2,"fitted":47.36,"lower":46.21,"upper":48.51,"residual":-2.16},{"predictor":5500,"observed":46.8,"fitted":48.94,"lower":47.55,"upper":50.33,"residual":-2.14},{"predictor":4400,"observed":41.3,"fitted":43.16,"lower":42.45,"upper":43.86,"residual":-1.86},{"predictor":5300,"observed":46.2,"fitted":47.89,"lower":46.66,"upper":49.11,"residual":-1.69},{"predictor":3600,"observed":37.6,"fitted":38.95,"lower":38.07,"upper":39.83,"residual":-1.35},{"predictor":3300,"observed":36.2,"fitted":37.37,"lower":36.29,"upper":38.45,"residual":-1.17},{"predictor":4650,"observed":43.5,"fitted":44.47,"lower":43.67,"upper":45.27,"residual":-0.97},{"predictor":4600,"observed":43.4,"fitted":44.21,"lower":43.43,"upper":44.98,"residual":-0.81},{"predictor":3500,"observed":37.7,"fitted":38.42,"lower":37.48,"upper":39.37,"residual":-0.72},{"predictor":3150,"observed":36.2,"fitted":36.58,"lower":35.39,"upper":37.78,"residual":-0.38},{"predictor":3350,"observed":37.3,"fitted":37.64,"lower":36.59,"upper":38.68,"residual":-0.34},{"predictor":4275,"observed":42.2,"fitted":42.5,"lower":41.81,"upper":43.18,"residual":-0.3},{"predictor":5400,"observed":48.4,"fitted":48.41,"lower":47.11,"upper":49.72,"residual":-0.01},{"predictor":4750,"observed":45.2,"fitted":45,"lower":44.15,"upper":45.85,"residual":0.2},{"predictor":3900,"observed":40.9,"fitted":40.53,"lower":39.79,"upper":41.26,"residual":0.37},{"predictor":4150,"observed":42.3,"fitted":41.84,"lower":41.16,"upper":42.52,"residual":0.46},{"predictor":3900,"observed":41.1,"fitted":40.53,"lower":39.79,"upper":41.26,"residual":0.57},{"predictor":3800,"observed":40.6,"fitted":40,"lower":39.22,"upper":40.78,"residual":0.6},{"predictor":4050,"observed":42,"fitted":41.32,"lower":40.62,"upper":42.01,"residual":0.68},{"predictor":3550,"observed":39.6,"fitted":38.69,"lower":37.77,"upper":39.6,"residual":0.91},{"predictor":4975,"observed":47.2,"fitted":46.18,"lower":45.19,"upper":47.17,"residual":1.02},{"predictor":4850,"observed":46.6,"fitted":45.52,"lower":44.61,"upper":46.43,"residual":1.08},{"predictor":4300,"observed":43.8,"fitted":42.63,"lower":41.94,"upper":43.32,"residual":1.17},{"predictor":5550,"observed":50.5,"fitted":49.2,"lower":47.77,"upper":50.63,"residual":1.3},{"predictor":5100,"observed":48.2,"fitted":46.84,"lower":45.76,"upper":47.91,"residual":1.36},{"predictor":4700,"observed":46.4,"fitted":44.73,"lower":43.91,"upper":45.56,"residual":1.67},{"predictor":3950,"observed":42.7,"fitted":40.79,"lower":40.07,"upper":41.51,"residual":1.91},{"predictor":3450,"observed":40.2,"fitted":38.16,"lower":37.18,"upper":39.14,"residual":2.04},{"predictor":2925,"observed":37.9,"fitted":35.4,"lower":34.03,"upper":36.77,"residual":2.5},{"predictor":4550,"observed":46.5,"fitted":43.94,"lower":43.19,"upper":44.7,"residual":2.56},{"predictor":3200,"observed":39.7,"fitted":36.85,"lower":35.69,"upper":38,"residual":2.85},{"predictor":3425,"observed":41.1,"fitted":38.03,"lower":37.04,"upper":39.02,"residual":3.07},{"predictor":4200,"observed":45.5,"fitted":42.1,"lower":41.42,"upper":42.79,"residual":3.4},{"predictor":5000,"observed":50.5,"fitted":46.31,"lower":45.3,"upper":47.32,"residual":4.19}]


const model = {
  params: {intercept: 20.02, slope: 0.00526},
  R2: 0.775
}
model.predict = function(x) {return model.params.intercept + model.params.slope * x}
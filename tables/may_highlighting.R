library(tidyverse)
library(scales)
library(colorspace)
library(glue)

data_raw <- read_csv("C:/Users/jchoe/Downloads/may_fixed_encoding.txt")


df <- data_raw %>% 
  mutate(
    Duration = abs(Duration),
    across(contains("F0"), ~ as.numeric(replace(.x, which(.x == "--undefined--"), NA))),
    across(c(Passage, Sentence, MeasurementOrder), as.integer),
    across(contains("F0"), ~ replace(.x, which(data_raw$MeasurementLabel == "sp"), NA))
  ) %>% 
  select(-Speaker)


## mean f0 table


df_palette <- rev(colorspace::sequential_hcl(15, palette = 'Reds', alpha = .9))

df_colorscaled <- df %>% 
  group_by(Passage, Sentence) %>% 
  mutate(
    background_color = scales::col_numeric(
      palette = df_palette,
      na.color = "transparent",
      domain = MeanF0
    )(MeanF0),
    font_color = ifelse(!is.na(MeanF0) & MeanF0 > attr(scale(MeanF0), 'scaled:center'), "white", "black"),
  ) %>% 
  ungroup() %>% 
  mutate(
    MeasurementLabel = replace(MeasurementLabel, MeasurementLabel == "sp", " "),
    background_color = replace(background_color, MeasurementLabel == " ", "slategrey"),
    margin = ifelse(MeasurementLabel == " ", "2px", "1px"),
    html = glue("<span style='margin-left: {margin}; margin-right: {margin}; color: {font_color}; background-color: {background_color}'>{MeasurementLabel}</span>")
  )

df_tbl <- df_colorscaled %>% 
  group_by(Passage, Sentence) %>% 
  summarize(
    Label = str_trim(paste(html, collapse = "")),
    .groups = 'drop'
  )

df_tbl_final <- df_tbl %>% 
  reactable(
    minRows = nrow(df_tbl),
    pagination = FALSE,
    columns = list(
      Passage = colDef(width = 100),
      Sentence = colDef(width = 100),
      Label = colDef(html = TRUE, resizable = TRUE)
    )
  )



## duration table


df_colorscaled_sp <- df %>% 
  group_by(Passage, Sentence) %>% 
  filter(
    !(row_number() %in% c(1, n()) & MeasurementLabel == "sp")
  ) %>% 
  mutate(
    dur_scaled = ifelse(MeasurementLabel == "sp", Duration/sum(Duration, na.rm = TRUE), NA),
    padding = {
      if (sum(MeasurementLabel == "sp") == 0) {
        NA
      } else if (sum(MeasurementLabel == "sp") == 1) {
        30 * dur_scaled + 5
      } else {
        30 * (dur_scaled - min(dur_scaled, na.rm = TRUE))/diff(range(dur_scaled, na.rm = TRUE)) + 5
      }
    }
  ) %>% 
  ungroup() %>% 
  mutate(
    margin = ifelse(MeasurementLabel == "sp", "5px", "1px"),
    background_color = ifelse(MeasurementLabel == "sp", "#2F51B0", "transparent"),
    font_color = ifelse(MeasurementLabel == "sp", "white", "black"),
    MeasurementLabel = replace(MeasurementLabel, MeasurementLabel == "sp", ceiling(Duration[MeasurementLabel == "sp"] * 1000)),
    html = glue("<span style='margin-left: {margin}; margin-right: {margin}; padding-left: {padding}px; padding-right: {padding}px; color: {font_color}; background-color: {background_color}'>{MeasurementLabel}</span>")
  )

df_tbl_sp <- df_colorscaled_sp %>% 
  group_by(Passage, Sentence) %>% 
  summarize(
    Label = str_trim(paste(html, collapse = "")),
    .groups = 'drop'
  )

df_tbl_sp_final <- df_tbl_sp %>% 
  reactable(
    minRows = nrow(df_tbl_sp),
    pagination = FALSE,
    columns = list(
      Passage = colDef(width = 100),
      Sentence = colDef(width = 100),
      Label = colDef(html = TRUE, resizable = TRUE)
    )
  )

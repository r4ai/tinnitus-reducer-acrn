#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tinnitus_reducer_acrn::AppBuilder::new().run()
}

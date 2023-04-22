use tauri::{App, Manager};
use window_shadows::set_shadow;

#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

#[derive(Default)]
pub struct AppBuilder {
    setup: Option<SetupHook>,
}

impl AppBuilder {
    pub fn new() -> Self {
        Self::default()
    }

    #[must_use]
    pub fn setup<F>(mut self, setup: F) -> Self
    where
        F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
    {
        self.setup.replace(Box::new(setup));
        self
    }

    pub fn run(self) {
        let setup = self.setup;
        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![])
            .setup(move |app| {
                if let Some(setup) = setup {
                    (setup)(app)?;
                }
                Ok(())
            })
            .setup(|app| {
                let window = app.get_window("main").unwrap();

                // Remove window decorations on Windows
                if cfg!(target_os = "windows") {
                    window.set_decorations(false)?;
                } else {
                    window.set_decorations(true)?;
                }

                // Enable window shadows on macOS and Windows
                #[cfg(any(windows, target_os = "macos"))]
                set_shadow(&window, true).unwrap();

                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}

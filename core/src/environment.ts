const isWin = process.platform === "win32";

export const environment = {
  configDir: process.env.XDG_CONFIG_HOME !== undefined ? process.env.XDG_CONFIG_HOME : isWin ? "%LOCALAPPDATA%\\blip" : "~/.config/blip",
  hostsFilePath: isWin ? "C:\\Windows\\System32\\drivers\\etc\\hosts" : "/etc/hosts"
}

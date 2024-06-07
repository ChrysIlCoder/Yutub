import { ip, port } from ".."

export function rewrite_url(url: string, folder: string, uuid: string) {
  return `http://${ip}:${port}/${url.substring(url.indexOf(folder)).replace(folder, `assets/${folder}`)}`
}
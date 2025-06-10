import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ファイル名を生成するユーティリティ関数
 */
export function generateFileName(inkName: string, extension: string = 'jpg') {
  // extensionをバリデーション
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif']
  if (!validExtensions.includes(extension.toLowerCase())) {
    return
  }
  // inkNameから安全なファイル名を生成
  const safeInkName = inkName.replace(/[.\s\.]/g, '_')
  // 現在の日付と時刻を取得
  const now = new Date().toISOString().replace(/[\D]/g, '')
  // ファイル名を生成
  return `${safeInkName}_${now}.${extension}`
}

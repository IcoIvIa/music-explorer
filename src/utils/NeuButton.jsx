/**
 * 共通ニューモーフィズムボタン
 *
 * @param {'primary'|'yellow'|'disabled'} variant
 *   primary  - lime green テキスト（デフォルト）
 *   yellow   - yellow テキスト（お気に入り済み等）
 *   disabled - グレーテキスト＋シャドウなし＋not-allowed
 * @param {boolean} isDisabled  disabled状態
 * @param {string}  className   追加クラス
 */
function NeuButton({
  children,
  onClick,
  variant = 'primary',
  isDisabled = false,
  className = '',
  ...rest
}) {
  const colorMap = {
    primary:  'text-[#bef264]',
    yellow:   'text-[#fde68a]',
    pink:     'text-[#f9a8d4]',
    disabled: 'text-[#4b5563]',
  }

  const resolvedVariant = isDisabled ? 'disabled' : variant
  const textColor = colorMap[resolvedVariant] ?? colorMap.primary
  const shadow    = resolvedVariant === 'disabled' ? '' : 'shadow-neu'
  const cursor    = resolvedVariant === 'disabled' ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full py-3 rounded-xl text-sm font-bold tracking-widest
        bg-surface
        ${shadow} ${textColor} ${cursor} ${className}
      `.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}

export default NeuButton

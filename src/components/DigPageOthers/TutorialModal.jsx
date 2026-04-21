/**
 * 初回起動（ローカルストレージのhasSeenTutorial有無で判断）に簡単なチュートリアルを表示するコンポーネント
 * @param {boolean} isOpen - モーダルの開閉状態
 * @param {function} onClose - モーダルを閉じる関数
 * @param {number} tutorialStep - 現在のステップ番号
 * @param {function} setTutorialStep - ステップを更新する関数
 */
    const step = [
        { text: '検索したアーティストに関連するアーティストが5つ表示されています。クリックして人気曲を聴いてみてください', align: 'left' },
        { text: '"dig"をクリックすると、現在表示しているアーティストに関連するアーティストを5つ表示することができます。新しいアーティストを発見しよう！', align: 'right' },
        { text: '発見したアーティストをお気に入りに追加しましょう！', align: 'right' },
    ]

function TutorialModal({ isOpen, onClose, tutorialStep, setTutorialStep }) {
    if (!isOpen) return null

    const currentStep = step[tutorialStep - 1];

    const CloseTutorial = () => {
        localStorage.setItem('hasSeenTutorial', true)
        onClose()
    };

    const handleClick = () => {
        if(tutorialStep === step.length)
            CloseTutorial()
        else
            setTutorialStep(tutorialStep + 1)
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={handleClick}
        >
            <div
                 className="absolute bottom-24 rounded-2xl px-6 py-4 bg-white shadow-neu max-w-sm"
                style={{
                    left: currentStep.align === 'left' ? "20px" : "auto",
                    right: currentStep.align === 'left' ? "auto" : "300px",
                }}
            >
        <p className="text-sm text-[#1a0f2e] leading-relaxed">
            {currentStep.text}
        </p>
        <p className="text-xs mt-3 text-[rgba(26,15,46,0.4)] text-right">
            {tutorialStep} / {step.length}
            </p>
            </div>
        </div>
    )
}

export default TutorialModal
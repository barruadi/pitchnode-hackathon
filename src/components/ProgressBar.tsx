interface ProgressBarProps {
    progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
    const validProgress = Math.max(0, Math.min(100, progress));

    return (
        <div>
            <div className="w-full bg-gray-200 h-4 rounded-full mb-4 relative">
                <div
                    className="absolute top-0 left-0 h-4 rounded-full bg-blue-600"
                    style={{ width: `${validProgress}%` }}
                ></div>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold mb-4">
                <span className="text-gray-700">{validProgress}% funded</span>
            </div>
        </div>
    );
}

export default ProgressBar;
import BackPage from "../BackPage";

export default function Title({ title, subtitle, back = false }) {
    if (!title && !subtitle) return null;

    return (
        <div className="flex justify-between mb-5 relative">
            <div>
                <h1 className=" text-3xl font-bold text-gray-800 mb-2">
                    {title}
                </h1>
                <p className="text-gray-600">
                    {subtitle}
                </p>
            </div>
            {back && (
                <div className="mt-4">
                    <BackPage />
                </div>
            )}
        </div>
    );
}

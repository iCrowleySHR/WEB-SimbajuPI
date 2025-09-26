export default function Title({ title, subtitle }) {
    if (!title && !subtitle) return null
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {title}
                </h1>
                <p className="text-gray-600">
                    {subtitle}
                </p>
            </div>
        </>
    )
}

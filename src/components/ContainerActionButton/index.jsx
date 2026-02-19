export default function ContainerActionButton({children}){
    return(
        <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                {children}
            </div>
        </>
    );
}
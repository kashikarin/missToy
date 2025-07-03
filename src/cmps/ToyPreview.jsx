export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview-container">
            <div className="toy-preview-info">
                <img src={toy.imageUrl} alt={`${toy.name}'s image`} />
                <h2>{toy.name}</h2>
                <h4>{toy.price}EUR</h4>
                <h5 style={{color: toy.status ? 'var(--clr3bg)' : 'var(--clr1bg)'}}>{toy.status? 'In stock' : 'Sold out'}</h5>
            </div>
            <div className="toy-preview-labels-container">
                {toy.labels?.map(label => <span key={label} className='label-toy-preview'>{label}</span>)}
            </div>
        </article>
    )
}

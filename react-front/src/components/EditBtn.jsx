export const EditBtn = ({id, name, image, isOpen, onToggle}) => {

    const handleClick = () => {
        onToggle(id);
    }

    return (
        <button 
            className={`category-btn ${isOpen ? 'active' : ''}`}
            onClick={handleClick}
        >
            <img src={image} alt={name} className="category-icon" />
            <span className="category-name">{name}</span>
            <svg className={`arrow ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24">  
                <path d="M6 9L12 15L18 9" />
            </svg>
        </button>
    )
}
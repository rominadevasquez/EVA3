import { sanitizeText } from "../utils/sanitize";

const CourseCard = ({
 course,
 isFavorite = false,
 onToggleFavorite = () => {},
 className = "",
}) => {
 const safeTitle = sanitizeText(course?.title);
 const safeDescription = sanitizeText(course?.description);
 const safeTeacherId = course?.teacherId ?? "Desconocido";

 return (
 <article className={`course-card ${className}`.trim()}>
 <h2>{safeTitle}</h2>
 <p>{safeDescription}</p>
 <small>Docente ID: {safeTeacherId}</small>
 <button
 type="button"
 onClick={() => onToggleFavorite(course)}
 className={isFavorite ? "btn favorite" : "btn"}
 >
 {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
 </button>
 </article>
 );
};

export default CourseCard;

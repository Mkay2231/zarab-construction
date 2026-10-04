import { Link } from 'react-router-dom';

export default function Breadcrumb({ current }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

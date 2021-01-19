import LoaderSpinner from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.Loader}>
      <LoaderSpinner type="Audio" color="#3f51b5" height={80} width={80} />
    </div>
  );
}

export default Loader;

import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

const LoadableComponent = (component: any) =>
  Loadable({
    loader: component,
    loading: Loading,
  });

export default LoadableComponent;

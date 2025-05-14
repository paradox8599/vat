import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { VATApp } from '@extension/ui';

function Popup() {
  return (
    <div>
      <VATApp />
    </div>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

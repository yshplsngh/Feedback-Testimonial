import { Fragment } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '../../ui/components/Button';
import { Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Checkbox from '../../ui/components/Checkbox';

const EditWidgetBox = ({ spaceName }: { spaceName: string | undefined }) => {
  return (
    <Fragment>
      {/*Widget Editing*/}
      <div className={'space-y-5'}>
        <p className={'code relative w-full'}>
          <SyntaxHighlighter
            language="html"
            style={vscDarkPlus}
            className="border-accent border-2"
            customStyle={{
              padding: '10px',
              margin: 0,
              borderRadius: 'inherit',
            }}
          >
            {`<iframe id="${spaceName}" height="300px" src="http://localhost:4000/api/${spaceName}?theme=" width="100%"></iframe>`}
          </SyntaxHighlighter>
          <Button
            type={'button'}
            variant={'outlineB'}
            icon={<Copy className={'h-4 w-4'} />}
            className={`absolute right-[1px] top-1 h-9 w-fit rounded-none border-none bg-transparent backdrop-blur-md backdrop-filter hover:bg-transparent`}
            onClick={async () => {
              await navigator.clipboard.writeText(
                `<iframe id="${spaceName}" height="300px" src="http://localhost:4000/api/${spaceName}" width="100%"></iframe>`,
              );
              toast.success('Copied');
            }}
          />
        </p>
        <div className={''}>
          <Checkbox text={'Light Mode'} />
        </div>
      </div>

      {/*live preview*/}
      <div className={'space-y-2'}>
        <p className={'flex items-center gap-x-1'}>
          Live Preview <Eye className={'h-4 w-4'} />
        </p>
        <iframe
          id={spaceName}
          height="300px"
          className={'border-accent border-2'}
          src={`http://localhost:4000/api/${spaceName}`}
          width="100%"
        ></iframe>
      </div>
    </Fragment>
  );
};
export default EditWidgetBox;

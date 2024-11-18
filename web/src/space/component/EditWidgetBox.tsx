import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '../../ui/components/Button';
import { CircleAlert, Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Checkbox from '../../ui/components/Checkbox';

const EditWidgetBox = ({ spaceName }: { spaceName: string | undefined }) => {
  const [lightMode, setLightMode] = useState<boolean>(false);
  const [speed, setSpeed] = useState<string>();
  return (
    <div className={'px-2 md:px-5'}>
      {/*Widget Editing*/}
      <div className={'space-y-10'}>
        <p className={'code flex w-full'}>
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
            {`<iframe id="${spaceName}" height="300px" src="http://localhost:4000/api/${spaceName}?theme=${lightMode ? 'light' : 'dark'}${speed ? `&speed=${speed}` : ''}" width="100%"></iframe>`}
          </SyntaxHighlighter>
          <Button
            type={'button'}
            variant={'outlineB'}
            icon={<Copy className={'h-4 w-4'} />}
            className={`hover:bg-accent h-11 w-fit rounded-none border-none bg-zinc-900`}
            onClick={async () => {
              await navigator.clipboard.writeText(
                `<iframe id="${spaceName}" height="300px" src="http://localhost:4000/api/${spaceName}?theme=${lightMode ? 'light' : 'dark'}${speed ? `&speed=${speed}` : ''}" width="100%"></iframe>`,
              );
              toast.success('Copied');
            }}
          />
        </p>

        <div className={'ml-4 flex flex-col space-y-4'}>
          <Checkbox
            text={'Light Mode'}
            onClick={() => setLightMode((prev) => !prev)}
          />

          <div className="flex gap-x-4">
            <div className="relative w-40">
              <input
                type="text"
                value={speed}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setSpeed(value);
                }}
                className="ease focus:border-accent w-full appearance-none rounded-md border border-slate-600 bg-transparent py-2 pl-3 pr-3 text-sm text-zinc-100 shadow-sm transition duration-300 [-moz-appearance:textfield] placeholder:text-slate-500 hover:border-slate-500 focus:shadow focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Widget Speed"
              />
            </div>
            <p className="flex items-center gap-x-1 text-xs text-slate-400">
              <CircleAlert className={'h-4 w-4'} />
              Lower the value, higher the speed
            </p>
          </div>
        </div>
      </div>

      {/*live preview*/}
      <div className={'mt-5 space-y-2'}>
        <p className={'flex items-center gap-x-1'}>
          Live Preview <Eye className={'h-4 w-4 text-green-600'} />
        </p>
        <iframe
          id={spaceName}
          height="300px"
          className={'border-accent rounded-lg border-2'}
          src={`http://localhost:4000/api/${spaceName}?theme=${lightMode ? 'light' : 'dark'}${speed ? `&speed=${speed}` : ''}`}
          width="100%"
        ></iframe>
      </div>
    </div>
  );
};
export default EditWidgetBox;

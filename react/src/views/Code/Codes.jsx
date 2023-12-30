import Code from "./Code";
import PageComponent from "../../components/PageComponent";
import { LinkIcon} from '@heroicons/react/24/outline';
import TButton from "../../components/TButton";

export default function Codes() {
    return (
        <PageComponent title="Codes page." buttons={
            <div className='flex gap-2'>
                <TButton color='green' href="/codes/create">
                    <LinkIcon className='h-4 w-4 mr-2' />
                    Post New Code
                </TButton>
            </div>
        }>
            <Code />
        </PageComponent>
    )
}

import Code from "../components/Code";
import PageComponent from "../components/PageComponent";

export default function Dashboard() {
    return (
        <PageComponent title="Dashboard" >
            <div className="block sm:flex sm:columns-3 max-w-7xl justify-between items-center">
                <div className="w-80 flex flex-col justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                    <h3>Number of Codes you Posted</h3>
                    <h1>5</h1>
                </div>

                <div className="w-80 flex flex-col justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                    <h3>Number of Problems Solved</h3>
                    <h1>5</h1>
                </div>

                <div className="w-80 flex flex-col  justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                    <h3>Number of People you have helped</h3>
                    <h1>5</h1>
                </div>
            </div>

            <div className="block w-full mt-5"> 
                <Code />
            </div>
        </PageComponent>
    )
}

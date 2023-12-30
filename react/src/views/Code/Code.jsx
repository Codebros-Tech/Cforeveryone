export default function Code() {
    const codeString =  `
#include <stdio.h>
int main () {
    printf("Hello world");
    return 0;
}
`;

    return (
        <div className="flex ps-2 flex-col justify-between border-b-2 border-blue-400">
            
            <h3 className="font-semibold sm:text-lg">Code Title</h3>
            <div className="flex justify-between items-center">
                <div>
                    Profile
                </div>

                <button className="text-sm font-bold border-blue-100 border-[1px] px-2 py-2 rounded bg-blue-950 text-white">
                    Copy Code.
                </button>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, magni!</p>
            <div className="py-2 border-[2px] min-h-[200px] mt-2 overflow-x-auto"> 
                <pre>
                    <code className="w-full">
                        {codeString}
                    </code>
                </pre>
            </div>
        </div>  
    )
}

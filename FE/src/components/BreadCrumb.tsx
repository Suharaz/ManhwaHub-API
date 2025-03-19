import { propBreadCrumb } from "@/types/TypeBreadCrumb";
import Link from "next/link";

function BreadCrumb({data}: {data: propBreadCrumb[]}) {
    return (  
        <section className="container px-[10px] mx-auto">
            <div className="block">
                <ol itemType="http://schema.org/BreadcrumbList" itemScope className="mt-[30px]">
                    {data.map((item, index) => (
                        <li key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem" className={`inline relative font-bold text-[20px] ${index != data.length -1 ? 'after:content-["/"] after:text-darkGrey after:px-2 after:text-[20px] hover:text-yellowPrimary text-greyLight transition-all duration-300' : 'text-yellowPrimary'}`}>
                            <Link itemProp="item" href={item.link}> 
                                <span itemProp="name">{item.title}</span>
                            </Link>
                            <meta itemProp="position" content={(index+1).toString()} />
                            <meta itemProp="name" content={item.title} />
                            <meta itemProp="item" content={item.link} />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default BreadCrumb;
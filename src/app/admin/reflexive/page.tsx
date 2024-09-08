import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

import axios from "axios";
import TablePagination from "@/components/admin/table-pagination";
import {TSocraticQuestioning} from "@/lib/types";
import cairosDays from "@/lib/constants/cairosDays";

async function getData(page: number = 1, type: string | undefined) {
    const url = process.env.NEXTAUTH_URL;
    return axios.get(`${url}api/v1/admin/reflexive?page=${page}` + (type ? `&type=${type}` : ""));
}

async function ReflexiveTable({ searchParams }: { searchParams: { [key: string]: string } }) {

    const page = Number(searchParams.page) || 1;
    const type = searchParams.type || undefined;
    const data = (await getData(page, type)).data;

    return (
        <div id="content">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Тип</TableHead>
                        <TableHead className="w-[120px] text-center">День тижню</TableHead>
                        <TableHead>Текст</TableHead>
                        <TableHead>Зображення</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data.reflexives.map((reflexive: TSocraticQuestioning) => (
                        <TableRow key={reflexive._id}>
                            <TableCell className="font-bold text-center">{reflexive.type}</TableCell>
                            <TableCell className="text-center">{cairosDays[reflexive.day].weekDayLocalKey}</TableCell>
                            <TableCell>{reflexive.text}</TableCell>
                            <TableCell>
                                <a href={reflexive.imageUrl}>
                                    <p className="w-[200px] text-ellipsis">
                                        {reflexive.imageUrl}
                                    </p>
                                </a>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
            <TablePagination page={page} totalPages={data.totalPages} />
        </div>
    );
}

export default ReflexiveTable;
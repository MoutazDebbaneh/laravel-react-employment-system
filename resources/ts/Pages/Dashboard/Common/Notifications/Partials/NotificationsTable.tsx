import { PageProps, UserNotification } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function NotificationTable({
    notifications,
}: {
    notifications: UserNotification[];
}) {
    const notificationsTranslations = (
        usePage<PageProps>().props.translations as Translations
    ).notifications as Translations;

    console.log(notificationsTranslations);

    const parseDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${date.getFullYear()}`;
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Event</StyledTableCell>
                        <StyledTableCell align="center">
                            Description
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((row, index) => (
                        <StyledTableRow key={index}>
                            <Link href={row.related_url!} className="contents">
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    className="min-w-[6rem]"
                                >
                                    {parseDate(row.created_at)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {(
                                        notificationsTranslations[
                                            `type${row.type}`
                                        ] as Translations
                                    ).heading.toString()}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {(
                                        notificationsTranslations[
                                            `type${row.type}`
                                        ] as Translations
                                    ).body.toString()}
                                </StyledTableCell>
                            </Link>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

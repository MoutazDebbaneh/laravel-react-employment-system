import { JobApplication } from "@/types";
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

export default function AppliedJobsTable({
    applications,
}: {
    applications: JobApplication[];
}) {
    const parseDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${date.getFullYear()}`;
    };

    console.log(applications);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">
                            Job Title
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Company
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications.map((row, index) => (
                        <StyledTableRow key={index}>
                            <a
                                href={route("jobs.details", row.job_id)}
                                className="contents"
                            >
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    className="min-w-[6rem]"
                                >
                                    {parseDate(row.created_at)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.job!.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.job!.company!.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.accepted === null ||
                                    row.accepted === undefined ? (
                                        <span className="font-bold">
                                            Pending
                                        </span>
                                    ) : row.accepted ? (
                                        <span className="text-green-700 font-bold">
                                            Accepted
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-bold">
                                            Declined
                                        </span>
                                    )}
                                </StyledTableCell>
                            </a>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

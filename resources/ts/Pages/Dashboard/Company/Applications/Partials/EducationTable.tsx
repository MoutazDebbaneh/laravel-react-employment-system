import { Education } from "@/types";
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

export default function EducationTable({
    educations,
}: {
    educations: Education[];
}) {
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
                        <StyledTableCell align="center">Degree</StyledTableCell>
                        <StyledTableCell align="center">
                            Institute
                        </StyledTableCell>
                        <StyledTableCell align="center">Field</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {educations.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                                className="whitespace-pre-line"
                            >
                                {parseDate(row.from) + "\n" + parseDate(row.to)}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.degree}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.institute}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.field}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

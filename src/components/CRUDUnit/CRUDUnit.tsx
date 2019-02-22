import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  Divider,
  Button
} from "@material-ui/core";
import {
  updateDocument,
  pathButlerLoansAndReturns,
  pathButlerUnits,
  pathCustomers,
  readCollection,
  setDocument,
  readDocument,
  pathUsers
} from "../../firebase/firebase";
import * as firebase from "firebase";

const departments = [
  {
    value: "Section 1",
    label: "Afdeling 1"
  },
  {
    value: "Section 2",
    label: "Afdeling 2"
  },
  {
    value: "Section 3",
    label: "Afdeling 3"
  },
  {
    value: "Section 4",
    label: "Afdeling 4"
  }
];
const rfids = [
  {
    value: "RFID-læser 1",
    label: "RFID-læser 1"
  },
  {
    value: "RFID-læser 2",
    label: "RFID-læser 2"
  },
  {
    value: "RFID-læser 3",
    label: "RFID-læser 3"
  },
  {
    value: "RFID-læser 4",
    label: "RFID-læser 4"
  }
];
const printers = [
  {
    value: "Printer 1",
    label: "Printer 1"
  },
  {
    value: "Printer 2",
    label: "Printer 2"
  },
  {
    value: "Printer 3",
    label: "Printer 3"
  },
  {
    value: "Printer 4",
    label: "Printer 4"
  }
];
const scanners = [
  {
    value: "Scanner 1",
    label: "Scanner 1"
  },
  {
    value: "Scanner 2",
    label: "Scanner 2"
  },
  {
    value: "Scanner 3",
    label: "Scanner 3"
  },
  {
    value: "Scanner 4",
    label: "Scanner 4"
  }
];
const barcode_readers = [
  {
    value: "Stregkodelæser 1",
    label: "Stregkodelæser 1"
  },
  {
    value: "Stregkodelæser 2",
    label: "Stregkodelæser 2"
  },
  {
    value: "Stregkodelæser 3",
    label: "Stregkodelæser 3"
  },
  {
    value: "Stregkodelæser 4",
    label: "Stregkodelæser 4"
  }
];
class CRUDUnit extends React.Component<
  { city: string; device: string },
  {
    device: string;
    code: string;
    login_name: string;
    loans: boolean;
    episode: boolean;
    payment: boolean;
    rfid: string;
    scanner: string;
    printer: string;
    barcode_reader: string;
    department: string;
    selectedCustomerUid: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      device: this.props.device,
      login_name: "",
      code: "",
      department: "",
      loans: false,
      episode: false,
      payment: false,
      rfid: "",
      scanner: "",
      printer: "",
      barcode_reader: "",
      selectedCustomerUid: ""
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ selectedCustomerUid: user.uid });
      } else {
        console.log("Error found for loggedin user");
        return null;
      }
    });
  }

  handleDeviceChange = (e: { target: { value: string } }) => {
    this.setState({ device: e.target.value });
    updateDocument(`${pathButlerUnits("nPqdWRKPxz2HImgryMzA")}/new`, {
      name: e.target.value,
      logMeInName: e.target.value
    });
  };

  handleNameChange = (e: { target: { value: string } }) => {
    this.setState({ login_name: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { logMeInName: e.target.value }
    );
  };

  handleDepartmentChange = (e: { target: { value: string } }) => {
    this.setState({ department: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { department: e.target.value }
    );
  };

  handleRFIDChange = (e: { target: { value: string } }) => {
    this.setState({ rfid: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { rfidReader: e.target.value }
    );
  };

  handleScannerChange = (e: { target: { value: string } }) => {
    this.setState({ scanner: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { scanner: e.target.value }
    );
  };

  handlePrinterChange = (e: { target: { value: string } }) => {
    this.setState({ printer: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { printer: e.target.value }
    );
  };

  handleBarcodeChange = (e: { target: { value: string } }) => {
    this.setState({ barcode_reader: e.target.value });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { barcode_scanner: e.target.value }
    );
  };

  handleLoan = (e: { target: { checked: boolean } }) => {
    this.setState({ loans: e.target.checked });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { activateLoans: e.target.checked }
    );
  };

  handleEpisode = (e: { target: { checked: boolean } }) => {
    this.setState({ episode: e.target.checked });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { activateReturns: e.target.checked }
    );
  };

  handlePayment = (e: { target: { checked: boolean } }) => {
    this.setState({ payment: e.target.checked });
    updateDocument(
      pathButlerLoansAndReturns({ customerId: this.state.selectedCustomerUid }),
      { activatePayments: e.target.checked }
    );
  };

  deleteUnit = (e: any) => {
    console.log("Deleted");
  };

  addUnit = (e: any) => {
    console.log("Added");
  };

  render() {
    const { city } = this.props;
    let {
      code,
      department,
      login_name,
      device,
      barcode_reader,
      episode,
      loans,
      payment,
      printer,
      rfid,
      scanner
    } = this.state;
    return (
      <div>
        <Typography
          color="secondary"
          variant="subheading"
          style={{ fontSize: 34 }}
          align="left"
        >
          {city}
        </Typography>
        <ExpansionPanel style={{ minWidth: 600 }}>
          <ExpansionPanelSummary expandIcon={"↑"}>
            <Typography>{device}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="title"
              style={{ color: "lightgrey", fontSize: 14 }}
            >
              Enhedsoplysninger
            </Typography>
            <form
              noValidate
              autoComplete="off"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="standard-name"
                  label="Enhedsnavn"
                  value={device}
                  onChange={this.handleDeviceChange}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="LogMeIn-navn
                  "
                  value={login_name}
                  onChange={this.handleNameChange}
                  margin="normal"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="standard-name"
                  label="Aktiveringskode"
                  value={code}
                  onChange={this.handleDeviceChange}
                  margin="normal"
                  disabled={true}
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Afdeling"
                  value={department}
                  onChange={this.handleDepartmentChange}
                  margin="normal"
                >
                  {departments.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </form>

            <Typography
              variant="title"
              style={{ color: "lightgrey", fontSize: 14, marginTop: 16 }}
            >
              Funktioner
            </Typography>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={loans}
                    onChange={this.handleLoan}
                    value="loans"
                  />
                }
                label="Udlån"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={episode}
                    onChange={this.handleEpisode}
                    value="episode"
                  />
                }
                label="Aflevering"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={payment}
                    onChange={this.handlePayment}
                    value="payment"
                  />
                }
                label="Betaling"
              />
            </FormControl>
            <form
              noValidate
              autoComplete="off"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", flex: 0.35 }}
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label="RFIDlæser "
                  value={rfid}
                  onChange={this.handleRFIDChange}
                  margin="normal"
                >
                  {rfids.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Printer"
                  value={printer}
                  onChange={this.handlePrinterChange}
                  margin="normal"
                >
                  {printers.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 0.35 }}
              >
                <TextField
                  id="standard-select-currency"
                  select
                  label="Scanner"
                  value={scanner}
                  onChange={this.handleScannerChange}
                  margin="normal"
                >
                  {scanners.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Stregkodelæser"
                  value={barcode_reader}
                  onChange={this.handleBarcodeChange}
                  margin="normal"
                >
                  {barcode_readers.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </form>
            <Divider style={{ marginTop: 32, marginBottom: 32 }} />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="secondary"
                onClick={this.deleteUnit}
                style={{ maxWidth: 100 }}
              >
                SLET
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 32
          }}
        >
          <Button
            color="primary"
            onClick={this.addUnit}
            style={{ maxWidth: 200 }}
          >
            Tilføj enhed
          </Button>
        </div>
      </div>
    );
  }
}

export default CRUDUnit;

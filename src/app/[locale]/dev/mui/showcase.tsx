"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export function MuiShowcase() {
  const [tab, setTab] = useState(0);
  const [choice, setChoice] = useState("one");

  return (
    <Stack spacing={4}>
      <Group title="Buttons">
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">Accent (CTA)</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" disabled>Disabled</Button>
          <Button variant="contained" color="error">Danger</Button>
        </Stack>
        <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Group>

      <Group title="Inputs">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
          <TextField label="Full name" sx={{ minWidth: 240 }} />
          <TextField label="Email" type="email" sx={{ minWidth: 240 }} />
          <TextField label="Vehicle" select defaultValue="sedan" sx={{ minWidth: 240 }}>
            <MenuItem value="shared">Shared seat</MenuItem>
            <MenuItem value="sedan">Sedan</MenuItem>
            <MenuItem value="minivan">Minivan</MenuItem>
            <MenuItem value="suv4x4">4x4 SUV</MenuItem>
          </TextField>
        </Stack>
      </Group>

      <Group title="Toggles">
        <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Child seat" />
          <FormControlLabel control={<Checkbox />} label="Ski rack" />
          <FormControlLabel control={<Switch defaultChecked />} label="WhatsApp updates" />
        </Stack>
        <RadioGroup row value={choice} onChange={(_, v) => setChoice(v)} sx={{ mt: 2 }}>
          <FormControlLabel value="one" control={<Radio />} label="One way" />
          <FormControlLabel value="return" control={<Radio />} label="Return" />
        </RadioGroup>
      </Group>

      <Group title="Chips and alerts">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Chip label="Open" color="success" />
          <Chip label="Chains" color="warning" />
          <Chip label="Closed" color="error" />
          <Chip label="4x4" variant="outlined" />
          <Chip label="Daily shuttle" color="primary" variant="outlined" />
        </Stack>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Alert severity="info">Jvari Pass open — chains required above Kobi.</Alert>
          <Alert severity="warning">Goderdzi Pass: 4x4 only.</Alert>
          <Alert severity="error">Avalanche advisory for Mestia road.</Alert>
          <Alert severity="success">Season opens in 55 days.</Alert>
        </Stack>
      </Group>

      <Group title="Cards and typography">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} useFlexGap>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h3" component="h3">Gudauri → Kazbegi</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                40-minute drive, 4x4 only in winter.
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Book</Button>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h3" component="h3">Tetnuldi daily shuttle</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                09:00 up, 16:30 down. Seats sold per day.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>See schedule</Button>
            </CardContent>
          </Card>
        </Stack>
      </Group>

      <Group title="Progress & slider">
        <Stack spacing={2}>
          <LinearProgress />
          <LinearProgress variant="determinate" value={62} color="secondary" />
          <Slider defaultValue={2} min={1} max={7} marks step={1} valueLabelDisplay="auto" />
        </Stack>
      </Group>

      <Group title="Tabs">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="primary" indicatorColor="primary">
          <Tab label="Overview" />
          <Tab label="Prices" />
          <Tab label="Reviews" />
        </Tabs>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary">
          {tab === 0 ? "Overview content." : tab === 1 ? "Pricing content." : "Reviews content."}
        </Typography>
      </Group>

      <Group title="Icon buttons">
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" aria-label="Add">+</IconButton>
          <IconButton color="secondary" aria-label="Share">↗</IconButton>
          <IconButton aria-label="More">…</IconButton>
        </Stack>
      </Group>
    </Stack>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 border-t border-line pt-6 first:border-none first:pt-0">
      <h2 className="mb-4 font-serif text-[20px] leading-[28px]">{title}</h2>
      {children}
    </section>
  );
}

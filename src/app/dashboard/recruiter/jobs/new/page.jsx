"use client";

import { useState } from "react";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";
import { Briefcase, Calendar, CircleCheck, MapPin } from "@gravity-ui/icons";

const jobCategories = [
  "Technology",
  "Marketing",
  "Sales",
  "Design",
  "Finance",
  "Customer Support",
  "Human Resources",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const currencies = ["USD", "BDT", "EUR", "GBP"];

function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  startContent,
}) {
  return (
    <TextField name={name} isRequired={required} type={type}>
      <Label className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </Label>

      <div className="relative">
        {startContent && (
          <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/40">
            {startContent}
          </div>
        )}

        <Input
          className={`h-11 w-full rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 ${
            startContent ? "pl-10" : ""
          }`}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>

      <FieldError className="mt-1 text-xs text-red-400" />
    </TextField>
  );
}

function FormTextarea({
  name,
  label,
  placeholder,
  required = false,
  rows = 5,
}) {
  return (
    <TextField name={name} isRequired={required}>
      <Label className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </Label>

      <TextArea
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-white/10 bg-[#222] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25"
      />

      <FieldError className="mt-1 text-xs text-red-400" />
    </TextField>
  );
}

function FormSelect({ name, label, placeholder, items, required = false }) {
  return (
    <Select name={name} isRequired={required} placeholder={placeholder}>
      <Label className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </Label>

      <Select.Trigger className="flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white outline-none">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover className="rounded-lg border border-white/10 bg-[#181818] p-1 text-white shadow-xl">
        <ListBox>
          {items.map((item) => (
            <ListBox.Item
              key={item}
              id={item}
              textValue={item}
              className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none hover:bg-white/10"
            >
              {item}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>

      <FieldError className="mt-1 text-xs text-red-400" />
    </Select>
  );
}

export default function NewJobPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recruiterCompany = {
    id: "company_123",
    name: "Acme Corp",
    status: "approved",
    plan: "Growth",
    activeJobs: 4,
    activeJobLimit: 10,
  };

  const canPostJob =
    recruiterCompany.status === "approved" &&
    recruiterCompany.activeJobs < recruiterCompany.activeJobLimit;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canPostJob) return;

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      salaryMin: formData.get("salaryMin"),
      salaryMax: formData.get("salaryMax"),
      currency: formData.get("currency"),
      location: isRemote ? "Remote" : formData.get("location"),
      isRemote,
      applicationDeadline: formData.get("applicationDeadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      companyId: recruiterCompany.id,
      status: "active",
      visibility: "public",
    };

    console.log(payload);

    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#111] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-2xl">
        <div className="border-b border-white/10 px-6 py-5">
          <h1 className="text-xl font-semibold">Post a Job</h1>
          <p className="mt-1 text-sm text-white/50">
            Add job details and publish it for job seekers.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="block space-y-8 p-6">
          <Fieldset className="space-y-5">
            <Fieldset.Legend className="flex items-center gap-2 text-base font-semibold">
              <Briefcase className="size-4 text-white/60" />
              Job Info
            </Fieldset.Legend>

            <Fieldset.Group className="grid gap-5 md:grid-cols-2">
              <FormInput
                name="title"
                label="Job Title"
                placeholder="e.g. Frontend Developer"
                required
              />

              <FormSelect
                name="category"
                label="Job Category"
                placeholder="Select category"
                items={jobCategories}
                required
              />

              <FormSelect
                name="type"
                label="Job Type"
                placeholder="Select job type"
                items={jobTypes}
                required
              />

              <FormSelect
                name="currency"
                label="Currency"
                placeholder="Select currency"
                items={currencies}
                required
              />

              <FormInput
                name="salaryMin"
                label="Salary Min"
                type="number"
                placeholder="30000"
                required
              />

              <FormInput
                name="salaryMax"
                label="Salary Max"
                type="number"
                placeholder="70000"
                required
              />

              <div className="md:col-span-2">
                <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#202020] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Remote Job</p>
                    <p className="text-xs text-white/45">
                      Turn this on if this job is fully remote.
                    </p>
                  </div>

                  <Switch
                    isSelected={isRemote}
                    onChange={() => setIsRemote(!isRemote)}
                  />
                </div>

                {!isRemote && (
                  <FormInput
                    name="location"
                    label="Location"
                    placeholder="City, Country"
                    required
                    startContent={<MapPin className="size-4" />}
                  />
                )}
              </div>

              <FormInput
                name="applicationDeadline"
                label="Application Deadline"
                type="date"
                required
                startContent={<Calendar className="size-4" />}
              />
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="space-y-5">
            <Fieldset.Legend className="text-base font-semibold">
              Job Description
            </Fieldset.Legend>

            <Fieldset.Group className="space-y-5">
              <FormTextarea
                name="responsibilities"
                label="Responsibilities"
                placeholder="Describe the main responsibilities..."
                required
              />

              <FormTextarea
                name="requirements"
                label="Requirements"
                placeholder="List skills, experience, education, or tools required..."
                required
              />

              <FormTextarea
                name="benefits"
                label="Benefits"
                placeholder="Mention benefits, bonus, remote flexibility, insurance, etc."
                rows={4}
              />
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="space-y-4">
            <Fieldset.Legend className="flex items-center gap-2 text-base font-semibold">
              <CircleCheck className="size-4 text-white/60" />
              Company
            </Fieldset.Legend>

            <div className="rounded-xl border border-white/10 bg-[#202020] p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <Info label="Company" value={recruiterCompany.name} />
                <Info label="Status" value={recruiterCompany.status} />
                <Info label="Plan" value={recruiterCompany.plan} />
                <Info
                  label="Job Limit"
                  value={`${recruiterCompany.activeJobs}/${recruiterCompany.activeJobLimit}`}
                />
              </div>

              {!canPostJob && (
                <p className="mt-4 text-sm text-red-400">
                  Your company must be approved and within your active job
                  limit.
                </p>
              )}
            </div>
          </Fieldset>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <Button type="button" variant="secondary">
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={!canPostJob || isSubmitting}
              className="bg-white px-6 font-semibold text-black"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize">{value}</p>
    </div>
  );
}

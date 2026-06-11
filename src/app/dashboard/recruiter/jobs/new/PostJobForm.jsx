"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  toast,
} from "@heroui/react";
import { createJob } from "@/lib/action/jobs";

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

export default function PostJobForm({ company }) {
  const router = useRouter();

  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canPostJob = true;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!company?._id) {
      toast.error("Please register your company first.");
      return;
    }

    if (!canPostJob || isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
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
        companyId: company._id,
        companyName: company.companyName,
        status: "active",
        visibility: "public",
      };

      const res = await createJob(payload);

      if (res?.insertedId) {
        toast.success("Job posted successfully!");
        router.push("/dashboard/recruiter/jobs");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong while posting the job.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-[#0f0f10] px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#171717] p-6">
          <h1 className="text-xl font-semibold">No Company Found</h1>
          <p className="mt-2 text-sm text-white/50">
            Please register your company before posting a job.
          </p>

          <Button
            onPress={() => router.push("/dashboard/recruiter/company")}
            className="mt-5 bg-white font-semibold text-black"
          >
            Register Company
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#171717] shadow-2xl">
        <div className="border-b border-white/10 px-6 py-5">
          <h1 className="text-xl font-semibold">Post a Job</h1>
          <p className="mt-1 text-sm text-white/50">
            Add job details and publish it for job seekers.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="block space-y-8 p-6">
          <Fieldset className="space-y-5">
            <Fieldset.Legend className="text-base font-semibold">
              Job Info
            </Fieldset.Legend>

            <Fieldset.Group className="grid gap-5 md:grid-cols-2">
              <InputBlock name="title" label="Job Title" required />

              <SelectBlock
                name="category"
                label="Job Category"
                items={jobCategories}
                required
              />

              <SelectBlock
                name="type"
                label="Job Type"
                items={jobTypes}
                required
              />

              <SelectBlock
                name="currency"
                label="Currency"
                items={currencies}
                required
              />

              <InputBlock
                name="salaryMin"
                label="Salary Min"
                type="number"
                required
              />

              <InputBlock
                name="salaryMax"
                label="Salary Max"
                type="number"
                required
              />

              <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#202020] p-4">
                <Switch isSelected={isRemote} onChange={setIsRemote}>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>

                  <Switch.Content>
                    <Label className="text-sm font-medium text-white">
                      Remote Job
                    </Label>
                    <p className="text-xs text-white/45">
                      Enable this if the position is fully remote.
                    </p>
                  </Switch.Content>
                </Switch>
              </div>

              {!isRemote && (
                <InputBlock name="location" label="Location" required />
              )}

              <InputBlock
                name="applicationDeadline"
                label="Application Deadline"
                type="date"
                required
              />
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="space-y-5">
            <Fieldset.Legend className="text-base font-semibold">
              Job Description
            </Fieldset.Legend>

            <Fieldset.Group className="space-y-5">
              <TextareaBlock
                name="responsibilities"
                label="Responsibilities"
                required
              />

              <TextareaBlock
                name="requirements"
                label="Requirements"
                required
              />

              <TextareaBlock name="benefits" label="Benefits" />
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="space-y-4">
            <Fieldset.Legend className="text-base font-semibold">
              Company
            </Fieldset.Legend>

            <div className="rounded-xl border border-white/10 bg-[#202020] p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <Info label="Company" value={company.companyName} />
                <Info label="Status" value={company.status} />
                <Info label="Industry" value={company.industry} />
                <Info label="Location" value={company.location} />
              </div>
            </div>
          </Fieldset>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <Button
              type="button"
              onPress={() => router.push("/dashboard/recruiter/jobs")}
              className="bg-[#252525] text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="bg-white px-6 font-semibold text-black"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}

function InputBlock({ name, label, type = "text", required = false }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>
      <Input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white"
      />
      <FieldError className="text-xs text-red-400" />
    </div>
  );
}

function TextareaBlock({ name, label, required = false }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>
      <TextArea
        name={name}
        rows={5}
        required={required}
        className="w-full resize-none rounded-lg border border-white/10 bg-[#222] px-4 py-3 text-sm text-white"
      />
      <FieldError className="text-xs text-red-400" />
    </div>
  );
}

function SelectBlock({ name, label, items, required = false }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>

      <Select name={name} placeholder="Select option" required={required}>
        <Select.Trigger className="flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover className="rounded-lg border border-white/10 bg-[#181818] p-1 text-white shadow-xl">
          <ListBox>
            {items.map((item) => (
              <ListBox.Item key={item} id={item} textValue={item}>
                {item}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <FieldError className="text-xs text-red-400" />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize text-white">
        {value || "N/A"}
      </p>
    </div>
  );
}

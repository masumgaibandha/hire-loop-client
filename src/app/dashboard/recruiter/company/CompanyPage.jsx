"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  toast,
} from "@heroui/react";
import { createCompany } from "@/lib/action/companies";


const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Customer Support",
];

const employeeRanges = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export default function CompanyPage({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [logoUpload, setLogoUpload] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLogoUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setLogoUpload(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function uploadImageToImgbb(file) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_IMGBB_API_KEY is missing");
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      let logoUrl = company?.logoUrl || "";

      if (logoUpload) {
        logoUrl = await uploadImageToImgbb(logoUpload);
      }

      const companyData = {
        companyName: formData.get("companyName"),
        website: formData.get("website"),
        industry: formData.get("industry"),
        location: formData.get("location"),
        employees: formData.get("employees"),
        description: formData.get("description"),
        logoUrl,
        status: company?.status || "pending",
        recruiterId: recruiter?.id || recruiter?._id || recruiter?.email,
        recruiterEmail: recruiter?.email,
        recruiterName: recruiter?.name,
      };

      const payload = await createCompany(companyData);

      if (payload.insertedId) {
        setCompany({
          _id: payload.insertedId,
          ...companyData,
        });

        toast.success("Company registered successfully!");

        setLogoUpload(null);
        setLogoPreview("");
        setIsEditing(false);

        requestAnimationFrame(() => {
          setShowForm(false);
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="px-6 py-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Company Profile</h1>
          <p className="mt-1 text-sm text-white/50">
            Manage your company information and approval status.
          </p>
        </div>

        {company && !showForm && (
          <Button
            className="bg-white font-semibold text-black"
            onPress={() => {
              setIsEditing(true);
              setShowForm(true);
              setLogoPreview(company.logoUrl || "");
            }}
          >
            Edit Company
          </Button>
        )}
      </div>

      {!company?._id && !showForm && (
        <div className="rounded-2xl border border-white/10 bg-[#171717] p-10 text-center">
          <h2 className="text-xl font-semibold">No company registered yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
            Register your company first. Once approved by admin, you can start
            posting jobs.
          </p>

          <Button
            className="mt-6 bg-white font-semibold text-black"
            onPress={() => {
              setShowForm(true);
              setIsEditing(false);
              setLogoUpload(null);
              setLogoPreview("");
            }}
          >
            Register Company
          </Button>
        </div>
      )}

      {company?._id && !showForm && <CompanyDetails company={company} />}

      {showForm && (
        <CompanyForm
          company={isEditing ? company : null}
          logoPreview={logoPreview}
          isSubmitting={isSubmitting}
          onLogoUpload={handleLogoUpload}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setLogoUpload(null);
            setLogoPreview("");
          }}
        />
      )}
    </main>
  );
}

function CompanyDetails({ company }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-5">
          <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#222]">
            {company.logoUrl ? (
              <Image
                src={company.logoUrl}
                alt={company.companyName || "Company logo"}
                width={80}
                height={80}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-white/40">
                {company.companyName?.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{company.companyName}</h2>
              <StatusBadge status={company.status} />
            </div>

            <p className="mt-1 text-sm text-white/50">{company.industry}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <Info label="Website URL" value={company.website || "Not provided"} />
        <Info label="Industry" value={company.industry} />
        <Info label="Location" value={company.location} />
        <Info label="Employee Count" value={company.employees} />
        <Info
          label="Recruiter"
          value={company.recruiterName || "Not provided"}
        />
        <Info
          label="Recruiter Email"
          value={company.recruiterEmail || "Not provided"}
        />

        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Description
          </p>
          <p className="mt-2 text-sm leading-6 text-white/75">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompanyForm({
  company,
  logoPreview,
  isSubmitting,
  onLogoUpload,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold">
          {company ? "Edit Company" : "Register New Company"}
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Enter your business details to continue.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="block space-y-6 p-6">
        <Fieldset>
          <Fieldset.Group className="grid gap-5 md:grid-cols-2">
            <InputBlock
              name="companyName"
              label="Company Name"
              placeholder="e.g. Acme Corp"
              defaultValue={company?.companyName}
              required
            />

            <SelectBlock
              name="industry"
              label="Industry"
              placeholder={company?.industry || "Select industry"}
              items={industries}
              defaultValue={company?.industry}
              required
            />

            <InputBlock
              name="website"
              label="Website URL"
              placeholder="https://www.company.com"
              defaultValue={company?.website}
            />

            <InputBlock
              name="location"
              label="Location"
              placeholder="City, Country"
              defaultValue={company?.location}
              required
            />

            <SelectBlock
              name="employees"
              label="Employee Count"
              placeholder={company?.employees || "Select employee count"}
              items={employeeRanges}
              defaultValue={company?.employees}
              required
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white/80">
                Company Logo
              </Label>

              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/15 bg-[#222] p-3 hover:border-white/30">
                <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/20 bg-white/5 text-white/60">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Company logo preview"
                      width={48}
                      height={48}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "↑"
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">Upload image</p>
                  <p className="text-xs text-white/45">PNG, JPG up to 5MB</p>
                </div>

                <input
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={onLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <TextareaBlock
                name="description"
                label="Brief Description"
                placeholder="Tell us about your company..."
                defaultValue={company?.description}
                required
              />
            </div>
          </Fieldset.Group>
        </Fieldset>

        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
          <Button
            type="button"
            className="bg-[#252525] text-white"
            onPress={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white font-semibold text-black disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : company
                ? "Update Company"
                : "Register Company"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

function InputBlock({
  name,
  label,
  placeholder,
  defaultValue = "",
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>

      <Input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="h-11 w-full rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white placeholder:text-white/35"
      />
    </div>
  );
}

function TextareaBlock({
  name,
  label,
  placeholder,
  defaultValue = "",
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>

      <TextArea
        name={name}
        rows={5}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-white/10 bg-[#222] px-4 py-3 text-sm text-white placeholder:text-white/35"
      />
    </div>
  );
}

function SelectBlock({
  name,
  label,
  placeholder,
  items,
  defaultValue,
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white/80">{label}</Label>

      <Select
        name={name}
        placeholder={placeholder}
        defaultSelectedKey={defaultValue}
        required={required}
      >
        <Select.Trigger className="flex h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-[#222] px-4 text-sm text-white">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover className="rounded-lg border border-white/10 bg-[#181818] p-1 text-white">
          <ListBox>
            {items.map((item) => (
              <ListBox.Item
                key={item}
                id={item}
                textValue={item}
                className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-white/10"
              >
                {item}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const value = status || "pending";

  const className =
    value === "approved"
      ? "bg-green-500/15 text-green-400"
      : value === "rejected"
        ? "bg-red-500/15 text-red-400"
        : "bg-yellow-500/15 text-yellow-400";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${className}`}
    >
      {value}
    </span>
  );
}

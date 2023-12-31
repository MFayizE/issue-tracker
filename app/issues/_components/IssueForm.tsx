'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { ErrorMessage , Spinner} from '@/app/components';
import { useState } from 'react';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor'; 

type IssueFormDate = z.infer<typeof IssueSchema>;

interface Props {
    issue?: Issue
}

const IssueForm = ({issue}:Props) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormDate>({
        resolver: zodResolver(IssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue)
                axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setError('An unexpected error occured.')
            setSubmitting(false)
        }

    })
    return (
        <div className='max-w-xl'>
            {
                error &&
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }

            <form className='space-y-3'
                onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage >{errors.title?.message}</ErrorMessage>
                <Controller name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => 
                    <SimpleMDE  placeholder='Description' {...field} />
                    } />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>{issue ? 'Update' : 'Submit New'} Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm
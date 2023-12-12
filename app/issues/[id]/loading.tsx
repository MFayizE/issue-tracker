import { Skeleton } from '@/app/components'
import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap='4' my='2'>
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage
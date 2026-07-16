<template>
  <div class="collaboration-panel bg-white rounded-lg shadow-lg">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <i class="fas fa-users mr-2 text-[#2F2E8B]"></i>
        Team Collaboration
      </h3>
    </div>
    
    <!-- Team Members -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-medium text-gray-900">Team Members</h4>
        <button 
          @click="showInviteModal = true"
          class="text-sm bg-[#2F2E8B] text-white px-3 py-1 rounded hover:bg-[#252579] transition-colors"
        >
          <i class="fas fa-plus mr-1"></i> Invite
        </button>
      </div>
      
      <div class="space-y-3">
        <div 
          v-for="member in teamMembers" 
          :key="member.id"
          class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="relative">
              <img 
                :src="member.avatar" 
                :alt="member.name"
                class="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <span 
                :class="[
                  'absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full',
                  member.status === 'online' ? 'bg-green-400' :
                  member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                ]"
              ></span>
            </div>
            <div>
              <div class="font-medium text-gray-900">{{ member.name }}</div>
              <div class="text-sm text-gray-500">{{ member.role }}</div>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <span :class="[
              'text-xs px-2 py-1 rounded-full',
              member.permission === 'admin' ? 'bg-red-100 text-red-800' :
              member.permission === 'editor' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            ]">
              {{ member.permission }}
            </span>
            <button 
              v-if="canManageMembers"
              @click="manageMember(member)"
              class="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
            >
              <i class="fas fa-ellipsis-v text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Activity Feed -->
    <div class="p-4 border-b border-gray-200">
      <h4 class="font-medium text-gray-900 mb-4">Recent Activity</h4>
      
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id"
          class="flex items-start gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
        >
          <img 
            :src="activity.user.avatar" 
            :alt="activity.user.name"
            class="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">
              <span class="font-medium">{{ activity.user.name }}</span>
              {{ activity.action }}
              <span class="font-medium">{{ activity.target }}</span>
            </p>
            <p class="text-xs text-gray-500">{{ formatTimeAgo(activity.timestamp) }}</p>
          </div>
          <i :class="[
            'fas text-sm flex-shrink-0 mt-1',
            activity.type === 'document' ? 'fa-file-alt text-blue-500' :
            activity.type === 'note' ? 'fa-sticky-note text-yellow-500' :
            activity.type === 'comment' ? 'fa-comment text-green-500' :
            'fa-edit text-gray-500'
          ]"></i>
        </div>
      </div>
    </div>
    
    <!-- Shared Comments -->
    <div class="p-4 border-b border-gray-200">
      <h4 class="font-medium text-gray-900 mb-4">Team Comments</h4>
      
      <!-- Add Comment -->
      <div class="mb-4">
        <div class="flex gap-3">
          <img 
            :src="currentUser.avatar" 
            :alt="currentUser.name"
            class="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div class="flex-1">
            <textarea 
              v-model="newComment"
              placeholder="Add a comment..."
              class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
              rows="2"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button 
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-3 py-1 text-sm bg-[#2F2E8B] text-white rounded hover:bg-[#252579] disabled:opacity-50 transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comments List -->
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div 
          v-for="comment in sharedComments" 
          :key="comment.id"
          class="flex gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <img 
            :src="comment.author.avatar" 
            :alt="comment.author.name"
            class="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-medium text-gray-900">{{ comment.author.name }}</span>
              <span class="text-xs text-gray-500">{{ formatTimeAgo(comment.createdAt) }}</span>
            </div>
            <p class="text-sm text-gray-700">{{ comment.text }}</p>
            
            <!-- Comment Actions -->
            <div class="flex items-center gap-3 mt-2">
              <button 
                @click="likeComment(comment.id)"
                :class="[
                  'text-xs flex items-center gap-1 hover:text-[#2F2E8B] transition-colors',
                  comment.likedByUser ? 'text-[#2F2E8B]' : 'text-gray-500'
                ]"
              >
                <i class="fas fa-heart"></i>
                {{ comment.likes }}
              </button>
              <button 
                @click="replyToComment(comment.id)"
                class="text-xs text-gray-500 hover:text-[#2F2E8B] transition-colors"
              >
                Reply
              </button>
              <button 
                v-if="comment.author.id === currentUser.id"
                @click="deleteComment(comment.id)"
                class="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="sharedComments.length === 0" class="text-center py-6 text-gray-500">
          <i class="fas fa-comments text-2xl mb-2 opacity-30"></i>
          <p class="text-sm">No comments yet. Start the conversation!</p>
        </div>
      </div>
    </div>
    
    <!-- Share Options -->
    <div class="p-4">
      <h4 class="font-medium text-gray-900 mb-4">Share Research</h4>
      
      <div class="space-y-3">
        <button 
          @click="shareViaLink"
          class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2F2E8B] hover:bg-blue-50 transition-colors"
        >
          <i class="fas fa-link text-[#2F2E8B]"></i>
          <div class="text-left">
            <div class="font-medium text-gray-900">Share via Link</div>
            <div class="text-sm text-gray-500">Generate shareable link with permissions</div>
          </div>
        </button>
        
        <button 
          @click="exportForTeam"
          class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2F2E8B] hover:bg-blue-50 transition-colors"
        >
          <i class="fas fa-download text-[#2F2E8B]"></i>
          <div class="text-left">
            <div class="font-medium text-gray-900">Export Research</div>
            <div class="text-sm text-gray-500">Download complete research package</div>
          </div>
        </button>
        
        <button 
          @click="presentFindings"
          class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2F2E8B] hover:bg-blue-50 transition-colors"
        >
          <i class="fas fa-presentation text-[#2F2E8B]"></i>
          <div class="text-left">
            <div class="font-medium text-gray-900">Present Findings</div>
            <div class="text-sm text-gray-500">Create presentation from research</div>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Invite Team Member</h3>
        
        <form @submit.prevent="sendInvite">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="inviteForm.email"
              type="email" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              placeholder="colleague@company.com"
              required
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Permission Level</label>
            <select 
              v-model="inviteForm.permission"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
            >
              <option value="viewer">Viewer - Can view only</option>
              <option value="editor">Editor - Can edit and comment</option>
              <option value="admin">Admin - Full access</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <textarea 
              v-model="inviteForm.message"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              rows="3"
              placeholder="Add a personal message to the invitation"
            ></textarea>
          </div>
          
          <div class="flex justify-end gap-3">
            <button 
              type="button"
              @click="showInviteModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-[#2F2E8B] text-white rounded-lg hover:bg-[#252579] transition-colors"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['member-invited', 'comment-added', 'research-shared'])

const teamMembers = ref([
  {
    id: 1,
    name: 'John Doe',
    role: 'Legal Researcher',
    avatar: '/api/placeholder/40/40',
    status: 'online',
    permission: 'admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Compliance Officer',
    avatar: '/api/placeholder/40/40',
    status: 'away',
    permission: 'editor'
  }
])

const currentUser = ref({
  id: 1,
  name: 'John Doe',
  avatar: '/api/placeholder/40/40'
})

const canManageMembers = ref(true)
const showInviteModal = ref(false)
const newComment = ref('')

const inviteForm = ref({
  email: '',
  permission: 'editor',
  message: ''
})

const recentActivities = ref([
  {
    id: 1,
    user: { name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
    action: 'commented on',
    target: 'Legal Framework Analysis',
    type: 'comment',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    user: { name: 'John Doe', avatar: '/api/placeholder/32/32' },
    action: 'uploaded',
    target: 'Compliance Report.pdf',
    type: 'document',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
])

const sharedComments = ref([
  {
    id: 1,
    author: { id: 2, name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
    text: 'The risk assessment section needs more detail on mitigation strategies.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 2,
    likedByUser: false
  }
])

const addComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: Date.now(),
    author: currentUser.value,
    text: newComment.value.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    likedByUser: false
  }
  
  sharedComments.value.unshift(comment)
  newComment.value = ''
  
  emit('comment-added', comment)
}

const likeComment = (commentId) => {
  const comment = sharedComments.value.find(c => c.id === commentId)
  if (comment) {
    if (comment.likedByUser) {
      comment.likes--
      comment.likedByUser = false
    } else {
      comment.likes++
      comment.likedByUser = true
    }
  }
}

const deleteComment = (commentId) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    sharedComments.value = sharedComments.value.filter(c => c.id !== commentId)
  }
}

const replyToComment = (commentId) => {
  // Implement reply functionality
  console.log('Reply to comment:', commentId)
}

const sendInvite = () => {
  emit('member-invited', {
    email: inviteForm.value.email,
    permission: inviteForm.value.permission,
    message: inviteForm.value.message
  })
  
  showInviteModal.value = false
  inviteForm.value = {
    email: '',
    permission: 'editor',
    message: ''
  }
}

const manageMember = (member) => {
  // Implement member management
  console.log('Manage member:', member)
}

const shareViaLink = () => {
  emit('research-shared', { type: 'link' })
}

const exportForTeam = () => {
  emit('research-shared', { type: 'export' })
}

const presentFindings = () => {
  emit('research-shared', { type: 'presentation' })
}

const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInMinutes = Math.floor((now - time) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return `${Math.floor(diffInMinutes / 1440)}d ago`
}
</script>